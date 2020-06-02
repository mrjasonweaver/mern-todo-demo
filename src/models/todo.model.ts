export interface TodoChecked {
  completion_date?: Date;
}

export interface Todo extends TodoChecked {
  name: String;
  description: String;
  target_completion_date: Date;
  _id?: String;
};