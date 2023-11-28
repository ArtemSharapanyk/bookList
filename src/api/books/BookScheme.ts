export interface BookScheme {
  title: string;
  author: string;
  rating: number;
  notes: string[];
  completion_status: 'read' | 'in_progress';
  _id: string;
}
