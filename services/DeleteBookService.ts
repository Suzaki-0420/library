import { injectable, inject } from "inversify";
import { TYPES } from "@/di/types";
import type { IDeleteBookService } from "@/interfaces/IDeleteBookService";
import type { IBookRepository } from "@/interfaces/IBookRepository";

@injectable()
export class DeleteBookService implements IDeleteBookService {
    constructor(
        @inject(TYPES.IBookRepository)
        private bookRepository: IBookRepository
    ) { }

    public async delete(bookId: string): Promise<boolean> {
        return await this.bookRepository.deleteBook(bookId);
    }
}