export interface Parent {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface ParentState {
  currentParent?: Parent;
}
