import { gql } from "graphql-tag";

export default function constructFilterQuery = (
  checkedKindle,
  checkedDruck,
  checkedJS,
  checkedTS
) => {
  let query = `
    query FilterBuecher {
      buecher(
        filter: {
          art: {
  `;

  if (checkedKindle) {
    query += `
            _eq: "Kindle"
    `;
  }

  if (checkedDruck) {
    if (checkedKindle) {
      query += ` _or: `;
    }
    query += `
            _eq: "Druckausgabe"
    `;
  }

  query += `
          }
          schlagwoerter: {
  `;

  if (checkedJS) {
    query += `
            _ilike: "%Javascript%"
    `;
  }

  if (checkedTS) {
    if (checkedJS) {
      query += ` _or: `;
    }
    query += `
            _ilike: "%Typescript%"
    `;
  }

  query += `
          }
        }
      ) {
        id
        isbn
        preis
        schlagwoerter
        titel {
          titel
        }
      }
    }
  `;

  return gql(query);
};