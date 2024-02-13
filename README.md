# Sugarloaf
A modest collection of reducers.

## Install

```bash
npm install sugarloaf
```

## Recipes (aka "Usage")

A few things to note:
* mappers cannot exist without formatters; you have to be deliberate
* the relationship between mappers and formatters is that of abstractions and 
  implementors in a GoF Bridge pattern, respectively. 
* As a general rule of thumb, mappers are more concerned with values while formatters
  are more concerned with keys, but the rules can be broken :smile: 

### uniq recipe

In the simple case of strings, a basic mapper & formatter combination will suffice.

```js
  const mapper = new Mapper(new Formatter());
  const uniqValues = Object.keys(['a','a','b','a','c','d','c','e'].reduce(mapper, {}));
  console.log(uniqValues); // ['a', 'b', 'c', 'd', 'e']
```

In the case where you might want to filter duplicate dates on the month, date, and year, a
basic mapper can be used with the date formatter. 

```js
  const formatter = new DateFormatter({
    keyFormat: Intl.DateTimeFormat('en-US'),  // MM/DD/YYYY format
  });
  const mapper = new Mapper(formatter);
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
  const mapper = new CountMapper(new Formatter());
  const countMap = ['a','a','b','a','c','d','c','e'].reduce(mapper, {});
  console.log(countMap); // {a: 3, b: 1, c: 2, d: 1, e: 1}
```

Use DateFormatter with CountMapper to count dates. 
```js
  const formatter = new DateFormatter({
    keyFormat: Intl.DateTimeFormat('en-US'),  // MM/DD/YYYY format
  });
  const mapper = new CountMapper(formatter);
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
  const formatter = new DateFormatter({
    keyFormat: Intl.DateTimeFormat('en-US'),  // MM/DD/YYYY format
  });
  const mapper = new GroupMapper(formatter);
  const input = [ 
    new Date('2024-02-07T11:01:51.427Z'), 
    new Date('2024-02-06T12:02:51.427Z'),
    new Date('2024-02-05T13:03:51.427Z'), 
    new Date('2024-02-06T14:04:51.427Z'),
  ];

  const dateCounts = input.reduce(mapper, {});
  console.log(dateCounts); /* { '2/5/2024': [2024-02-05T13:03:51.427Z],
                                '2/6/2024': [2024-02-06T12:02:51.427Z, 2024-02-06T14:04:51.427Z], 
                                '2/7/2024': [2024-02-07T11:01:51.427Z] }
```


## Motivation
A strong preference for 