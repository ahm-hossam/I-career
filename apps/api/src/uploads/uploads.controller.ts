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
import { memoryStorage } from 'multer';
import { InternalTokenGuard } from '../common/guards/internal-token.guard';
import { uploadBufferToCloudinary } from './cloudinary';

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

function matchesMagicBytes(buffer: Buffer, ext: string): boolean {
  const signature = MAGIC_BYTES[ext];
  if (!signature) return false;
  return buffer.subarray(0, signature.length).equals(signature);
}

@Controller('uploads')
@UseGuards(InternalTokenGuard)
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
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

    const ext = extname(file.originalname).toLowerCase();
    if (!matchesMagicBytes(file.buffer, ext)) {
      throw new BadRequestException('File content does not match its extension');
    }

    const url = await uploadBufferToCloudinary(file.buffer, 'icareer-uploads');
    return { url };
  }
}
