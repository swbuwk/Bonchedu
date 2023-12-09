import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File) {
    const fileName = randomUUID() + ".jpg"
    const filePath = path.resolve(__dirname, "..", "static", "files")
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
    }
    fs.writeFileSync(path.join(filePath, fileName), file.buffer)
    return fileName
  }
}
