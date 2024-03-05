# Sugarloaf
A modest collection of reducers.

## Install

```bash
npm install sugarloaf
```

## Recipes (aka "Usage")

A few things to note:
* map-makers cannot exist without helpers
* the relationship between map-makers and helpers is that of abstractions and 
  implementors in a GoF Bridge pattern, respectively. 
* map-makers are concerned with key-value pairs as they pertain to objects/maps
* helpers are concerned with representations of elements in different contexts

### uniq recipe

In the simple case of strings, a basic mapper will suffice.

```js
  const mapper = new MapMaker();
  const uniqValues = Object.keys(['a','a','b','a','c','d','c','e'].reduce(mapper, {}));
  console.log(uniqValues); // ['a', 'b', 'c', 'd', 'e']
```

In the case where you might want to filter duplicate dates on the month, date, and year, a
basic mapper can be used with the date helper. 

```js
  const helper = new DateHelper({
    identityFormatter: Intl.DateTimeFormat('en-US'),  // MM/DD/YYYY format
  });
  const mapper = new MapMaker(helper);
  const input = [ 
    new Date('2024-02-07T11:01:51.427Z'), 
    new Date('2024-02-06T12:02:51.427Z'),
    new Date('2024-02-05T13:03:51.427Z'), 
    new Date('2024-02-06T14:04:51.427Z'),
  ];
  const uniqFormattedDates = Object.keys(input.reduce(mapper, {}));
  console.log(uniqFormattedDates); // [ '2/7/2024', '2/5/2024', '2/6/2024' ]
  
  const uniqDates = Object.values(input.reduce(mapper, {}));
  console.log(uniqDates); /*  [ 2024-02-07T11:01:51.427Z, 
                                2024-02-05T13:03:51.427Z, 
                                2024-02-06T14:04:51.427Z ] */
```

### count recipe

```js
  const mapper = new CountMapMaker(new Formatter());
  const countMap = ['a','a','b','a','c','d','c','e'].reduce(mapper, {});
  console.log(countMap); // {a: 3, b: 1, c: 2, d: 1, e: 1}
```

Use DateHelper with CountMapMaker to count dates. 
```js
  const formatter = new DateHelper({
    identityFormatter: Intl.DateTimeFormat('en-US'),  // MM/DD/YYYY format
  });
  const mapper = new CountMapMaker(formatter);
  const input = [ 
    new Date('2024-02-07T11:01:51.427Z'), 
    new Date('2024-02-06T12:02:51.427Z'),
    new Date('2024-02-05T13:03:51.427Z'), 
    new Date('2024-02-06T14:04:51.427Z'),
  ];

  const dateCounts = input.reduce(mapper, {});
  console.log(dateCounts); /* { '2/5/2024': 1, 
                                '2/6/2024': 2, 
                                '2/7/2024': 1 } */
  
```

### groupBy recipe

```js
  const formatter = new DateHelper({
    identityFormatter: Intl.DateTimeFormat('en-US'),  // MM/DD/YYYY format
  });
  const mapper = new GroupMapMaker(formatter);
  const input = [ 
    new Date('2024-02-07T11:01:51.427Z'), 
    new Date('2024-02-06T12:02:51.427Z'),
    new Date('2024-02-05T13:03:51.427Z'), 
    new Date('2024-02-06T14:04:51.427Z'),
  ];

  const dateCounts = input.reduce(mapper, {});
  console.log(dateCounts); /* { '2/5/2024': [2024-02-05T13:03:51.427Z],
                                '2/6/2024': [2024-02-06T12:02:51.427Z, 2024-02-06T14:04:51.427Z], 
                                '2/7/2024': [2024-02-07T11:01:51.427Z] } */
```


## Motivation
A strong preference for separation of concerns. This is "the strange half" of a bigger picture.

