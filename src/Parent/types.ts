export interface Parent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ParentState {
  currentParent?: Parent;
}
