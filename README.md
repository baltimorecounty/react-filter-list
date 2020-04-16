## react-filter-list

A react component that provides standard way to show and filter lists.

[![DeepScan grade](https://deepscan.io/api/teams/1744/projects/10343/branches/141653/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=1744&pid=10343&bid=141653)
![Node.js CI](https://github.com/baltimorecounty/react-filter-list/workflows/Node.js%20CI/badge.svg)

## Getting Started

### Installation

After cloning the project, all that is needed to install is running `npm i` or
`npm install`

### Usage

```jsx
<FilterList
  title="News"
  filters={filters}
  apiEndpoint="{yourNewsEndpointGoesHere}"
  renderItem={({ title, articleSummary }) => (
    <div
      style={{
        border: "1px solid #e0e0e0",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h2>{title}</h2>
      <p>{articleSummary}</p>
    </div>
  )}
/>
```

### Props

| Prop name      | Type            | Default                                                            | Description                                                |
| -------------- | --------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- |
| title          | string          |                                                                    | A short description of the list you want to filter         |
| filters        | array           | []                                                                 | See (#filters)                                             |
| apiEndpoint    | string          |                                                                    | Api endpoint for the data you want to display              |
| renderItem     | React Component |                                                                    | A react component to display an individual pieces of data. |
| renderFilter   | React Component | [DefaultFilter](/src/components/DefaultFilter.jsx)                 | A react component to display an individual filter          |
| renderLoadMore | React Component | [DefaultLoadMoreButton](/src/components/DefaultLoadMoreButton.jsx) | A react component to display the load more button          |

### Filters

Filters are an array of items that allow a user to filter the data in the list.
Filters must be specified in the following format.

```js
const filters = [
  {
    targetApiField: "author",
    displayName: "Author",
    options: [
      { value: "1", label: "Jane Doe" },
      { value: "2", label: "John Doe" },
    ],
  },
  {
    targetApiField: "category.value",
    displayName: "Category",
    options: [
      { value: "releases", label: "News Releases" },
      { value: "stories", label: "Stories" },
    ],
  },
];
```

| Prop name      | Type            | Description                                                                                                                     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| targetApiField | string          | Value you would pass to the api via querystring to filter the api                                                               |
| displayName    | string          | Value you want to display for users to view.                                                                                    |
| options        | array (objects) | Contains an array of objects (label / value). Value is what you need to pass to the api, label is what you want the user to see |

### Running the App

Since the primary function of repository is to export the FilterList to npm, we
need a way to test our changes. The best way to do this is to open two terminals
and run the following commands in each:

- terminal 1: `npm run watch-build` - ensures any changes you make are rebuilt
  enabling live reload if you are running the demo
- terminal 2: `npm start` - runs a server with your demo component

**Note** - It would be good to cut this down to one script, but for now this
works

### Testing

To run all tests use `npm test`

## Contributing

Pull requests are welcome. For major changes, please
[open an issue](https://github.com/baltimorecounty/react-filter-list/issues/new)
first to discuss what you would like to change.

When working on an issue, please make sure to update tests accordingly.

## Gotchas

### Api Response Format

The component is dependent on the response for a list of items to be in the
following format

```json
{
  "metaData": {
    "page": 0,
    "recordsPerPage": 10,
    "baseUrl": "https://mycoolapi/api/news",
    "totalPages": 2,
    "totalRecords": 11,
    "links": {
      "self": "https://mycoolapi/api/news?page=0&recordsPerPage=10",
      "first": "https://mycoolapi/api/news?page=0&recordsPerPage=10",
      "previous": null,
      "next": "https://mycoolapi/api/news?page=1&recordsPerPage=10",
      "last": "https://mycoolapi/api/news?page=1&recordsPerPage=10"
    }
  },
  "records": [{}, {}, {}]
}
```

**Note**: Eventually we would like this to be a little more flexible, so that we
consume APIs that do not return this format.

## Roadmap

Currently this solution is tied very closely to specific [needs](#gotchas) of
Baltimore County. As the project grows, we would like to take out those specific
needs and make this more usable to a larger crowd.
