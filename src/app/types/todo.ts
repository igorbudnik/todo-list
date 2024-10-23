export interface ITodo {
  id: string;
  text: string;
  checked: boolean;
}

export type IFilter = 'All' | 'Active' | 'Completed';
