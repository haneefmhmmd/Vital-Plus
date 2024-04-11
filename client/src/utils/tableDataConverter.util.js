export const convertBooksDataToTableData = (books) => {
  let transformedData = [];
  books.map((data) => {
    let book = [];
    book.push(data.bookId);
    book.push(data.title);
    book.push(data.price);
    book.push(data.availability);
    book.push(data.author);
    book.push(data.publishedBy.name);
    transformedData.push(book);
  });

  return transformedData;
};

export const convertMembersDataToTableData = (members) => {
  let transformedData = [];
  members.map((data) => {
    let member = [];
    member.push(data.memberId);
    member.push(data.name);
    member.push(data.address);
    member.push(data.memberType);
    member.push(data.memberDate);
    member.push(data.expiryDate);
    transformedData.push(member);
  });

  return transformedData;
};

export const convertPublishersDataToTableData = (publishers) => {
  let transformedData = [];
  publishers.map((data) => {
    let publisher = [];
    publisher.push(data.pubId);
    publisher.push(data.name);
    publisher.push(data.address);
    transformedData.push(publisher);
  });
  return transformedData;
};

export const convertBorrowedBooksDataToTableData = (borrowedBooks) => {
  let transformedData = [];
  borrowedBooks.map((data) => {
    let borrowedBook = [];
    borrowedBook.push(data.id);
    borrowedBook.push(data.bookId);
    borrowedBook.push(data.memberId);
    borrowedBook.push(data.issue);
    borrowedBook.push(data.returnDate ?? "Null");
    borrowedBook.push(data.dueDate);
    transformedData.push(borrowedBook);
  });
  return transformedData;
};
