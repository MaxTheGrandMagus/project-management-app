import { IColumn } from "../store/columns/colSlice"

export interface BoardProps {
  id?: string,
  title: string,
  description: string,
  toggleWindow?: () => void
}

export interface ButtonProps {
  text: string, 
  type?: "reset" | "button" | "submit" | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined,
  themes: string | undefined
}

export interface ModalProps {
  boardId: string, 
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined,
  toggleWindow: () => void
}

export interface InputProps {
  value: string, 
  name: string,
  type: string,
  placeholder: string,
  id: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement> |  undefined
}

export interface BoardCreationProps {
  toggleWindow: () => void
}

export interface TaskCreationProps {
  colId: string,
  order: number,
  toggleWindow: () => void
}

export interface TokenProps {
  iat: string,
  login: string,
  userId: string,
}

export interface TaskAddProps {
  task: {
    userId?: string,
    title: string,
    description: string,
  }
  boardId?: string | null,
  colId?: string,
}

export interface TaskShowProps {
  userId?: string,
  title: string,
  description: string,
  done: boolean,
  order: number | null,
  id: string,
  boardId?: string;
  columnId?: string,
  files?: Array<FileProps> | [] | undefined,
  taskClick?: () => void;
  // choosenTask?: TaskShowProps,
}

export interface TaskShowProps {
  userId?: string,
  title: string,
  description: string,
  done: boolean,
  order: number | null,
  id: string,
  boardId?: string;
  columnId?: string,
  files?: Array<FileProps> | [] | undefined,
  // taskClick?: () => void;
  // choosenTask?: TaskShowProps,
}
export interface TaskProps {
  task: TaskShowProps,
  columnId: string,
  taskClick?: () => void;
}

export interface FileProps {
  filename: string,
  fileSize: number,
}
export interface ColumnProps {
  col: IColumn,
}

export interface TaskDelProps {
  boardId: string,
  colId: string,
  taskId: string
}

export interface TaskUpdateProps {
  body: {
    title: string,
    order: number | null,
    description: string,
    userId: string | undefined,
    boardId: string | null,
    columnId: string | undefined
  },
  id: string
}

export interface UserProps {
  id: string,
  login: string,
  name: string,
}