export interface Todo {
  name: String;
  description: String;
  target_completion_date: Date;
  completion_date?: Date;
  _id?: String;
};