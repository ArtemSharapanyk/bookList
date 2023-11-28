import React, { FC, useState } from 'react';
import { Checkbox } from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '../../../components/ui/Sheet/Sheet';
import { Button } from '../../../components/ui/Button/Button';
import { Label } from '../../../components/ui/Label/Label';
import { Input } from '../../../components/ui/Input/Input';
import { useEditBookApi } from '../../../api/books/booksApi';
import { BookScheme } from '../../../api/books/BookScheme';
import { toast } from '../../../utils/toaster/use-toast';

interface Props {
  id: string;
}

interface FormState {
  title: string;
  author: string;
  isBookReaded: boolean;
  rating: number;
}

export const EditBookModal: FC<Props> = ({ id }) => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    author: '',
    isBookReaded: false,
    rating: 0
  });

  const { editBook } = useEditBookApi(id);

  const inputOnChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkboxOnChange = () => {
    setFormState((prevState) => ({ ...prevState, isBookReaded: !prevState.isBookReaded }));
  };

  const onSubmit = () => {
    const { isBookReaded, ...other } = formState;

    const newBooks: Pick<BookScheme, 'author' | 'title' | 'rating' | 'completion_status'> = {
      ...other,
      completion_status: isBookReaded ? 'read' : 'in_progress'
    };

    if (formState.rating > 10) {
      return toast({ variant: 'destructive', title: 'Rating should be not biggest then 10!' });
    }

    if (!formState.title || !formState.author || !formState.rating) {
      return toast({ variant: 'destructive', title: 'Field are required!' });
    }

    editBook(newBooks);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mr-2">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit book</SheetTitle>
          <SheetDescription>
            Make changes to book here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input onChange={inputOnChange('title')} id="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input onChange={inputOnChange('author')} id="author" className="col-span-3" />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rating" className="text-right">
            Rating
          </Label>
          <Input
            id="rating"
            onChange={inputOnChange('rating')}
            className="col-span-3"
            type="number"
            min={0}
            max={10}
          />
        </div>

        <div className="items-center my-[15px] justify-end flex">
          <Checkbox
            className={clsx(
              'border-[#000]  border-[1px] w-[15px] h-[15px] mr-[5px] rounded-[5px]',
              { 'bg-[#000]': formState.isBookReaded }
            )}
            id="ireaded"
            onClick={checkboxOnChange}
          />
          <Label
            htmlFor="ireaded"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Set is book was read
          </Label>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={onSubmit}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
