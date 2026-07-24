import { randomBytes } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { extname } from 'node:path';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png']);
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

// Extension-based filtering only checks the claimed name — a file could be renamed to
// bypass it. These signatures confirm the actual bytes match what the extension claims.
const MAGIC_BYTES: Record<string, Buffer> = {
  '.png': Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  '.jpg': Buffer.from([0xff, 0xd8, 0xff]),
  '.jpeg': Buffer.from([0xff, 0xd8, 0xff]),
  '.pdf': Buffer.from('%PDF-', 'ascii'),
};

async function matchesMagicBytes(filePath: string, ext: string): Promise<boolean> {
  const signature = MAGIC_BYTES[ext];
  if (!signature) return false;

  const handle = await fs.open(filePath, 'r');
  try {
    const buffer = Buffer.alloc(signature.length);
    await handle.read(buffer, 0, signature.length, 0);
    return buffer.equals(signature);
  } finally {
    await handle.close();
  }
}

@Controller('uploads')
@UseGuards(InternalTokenGuard)
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (_req, file, callback) => {
          const ext = extname(file.originalname).toLowerCase();
          callback(null, `${randomBytes(16).toString('hex')}${ext}`);
        },
      }),
      limits: { fileSize: MAX_SIZE_BYTES },
      fileFilter: (_req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();
        if (!ALLOWED_EXTENSIONS.has(ext)) {
          callback(
            new BadRequestException('Only PDF, JPG, JPEG, and PNG files are allowed'),
            false,
          );
          return;
        }
        callback(null, true);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const ext = extname(file.filename).toLowerCase();
    const contentMatches = await matchesMagicBytes(file.path, ext);
    if (!contentMatches) {
      await fs.unlink(file.path).catch(() => {});
      throw new BadRequestException('File content does not match its extension');
    }

    return { url: `${process.env.PUBLIC_API_URL}/uploads/${file.filename}` };
  }
}
