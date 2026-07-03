export interface IDeleteBookService {
    delete(bookId: string): Promise<boolean>;
}