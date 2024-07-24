export class Page<T> {
  content: T[] = [];
  pageable: Pageable = new Pageable();
  totalElements = 0;
  totalPages = 0;
  last = false;
  size = 0;
  number = 0;
  sort: Sort = new Sort();
  numberOfElements = 0;
  first = false;
  empty = false;
}

export class Pageable {
  sort: Sort = new Sort();
  pageSize = 0;
  pageNumber = 0;
  offset = 0;
  paged = false;
  unpaged = false;
}

export class Sort {
  sorted = false;
  unsorted = false;
  empty = false;
}
