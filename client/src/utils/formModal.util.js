export const bookFormModal = (data, publishers = []) => {
  return [
    {
      label: "Title",
      name: "title",
      type: "text",
      value: data.title || "",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      value: data.price || "",
    },
    {
      label: "Availability",
      name: "availability",
      type: "select",
      value: data.availability || "",
      options: [
        {
          label: "Available",
          value: "Available",
        },
        {
          label: "Borrowed",
          value: "Borrowed",
        },
      ],
    },
    {
      label: "Author",
      name: "author",
      type: "text",
      value: data.author || "",
    },
    {
      label: "Publisher",
      name: "publishedBy",
      type: "select",
      value: data.publishedBy || "",
      options: convertPublishersToPublisherOptions(publishers),
    },
  ];
};

export const memberFormModal = (data = {}) => {
  return [
    {
      label: "Name",
      name: "name",
      type: "text",
      value: data.name || "",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      value: data.address || "",
    },
    {
      label: "Member Type",
      name: "memberType",
      type: "select",
      value: data.memberType || "",
      options: [
        {
          label: "Regular",
          value: "Regular",
        },
        {
          label: "Premium",
          value: "Premium",
        },
      ],
    },
    {
      label: "Member Date",
      name: "memberDate",
      type: "date",
      value: data.memberDate || "",
    },
    {
      label: "Expiry Date",
      name: "expiryDate",
      type: "date",
      value: data.expiryDate || "",
    },
  ];
};

export const publisherFormModal = (data) => {
  return [
    {
      label: "Name",
      name: "name",
      type: "text",
      value: data?.name || "",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      value: data?.address || "",
    },
  ];
};

export const borrowBooksFormModal = (books, members) => {
  return [
    {
      label: "Book",
      name: "bookId",
      type: "select",
      value: "",
      options: convertBooksToBookOptions(books),
    },
    {
      label: "Member",
      name: "memberId",
      type: "select",
      value: "",
      options: convertMembersToMemberOptions(members),
    },
  ];
};

const convertPublishersToPublisherOptions = (publishers) => {
  if (publishers.length == 0) {
    return [];
  }

  return publishers.map((publisher) => {
    return {
      label: publisher.name,
      value: publisher.pubId,
    };
  });
};

const convertBooksToBookOptions = (books) => {
  if (books.length == 0) {
    return [];
  }

  return books.map((book) => {
    return {
      label: book.title,
      value: book.bookId,
    };
  });
};

const convertMembersToMemberOptions = (members) => {
  if (members.length == 0) {
    return [];
  }

  return members.map((member) => {
    return {
      label: member.name,
      value: member.memberId,
    };
  });
};
