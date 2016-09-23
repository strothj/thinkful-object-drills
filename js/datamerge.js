'use strict';

function mergeDataStreams(stream1, stream2) {
  var result = {};
  for (var i = 0; i < stream1.length; i++) {
    result[stream1[i].id] = stream1[i];
  }
  for (var key in result) {
    var other = stream2.find(function(item) {
      return item.id == key;
    });
    for (var _key in other) {
      result[key][_key] = other[_key];
    }
  }
  return Object.keys(result).map(function (key) {
    return result[key];
  });
}

// data
var dataSource1 = [
  {
    id: '0',
    firstName: 'Juan',
    lastName: 'Doe',
    age: 32
  },
  {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    age: 31
  },
  {
    id: '2',
    firstName: 'Janice',
    lastName: 'Doe',
    age: 30
  },
  {
    id: '3',
    firstName: 'Jake',
    lastName: 'Doe',
    age: 29
  },
];

var dataSource2 = [
  {
    id: '0',
    occupation: 'architect',
    address: {
      street: '123 Main St',
      city: 'CityTown',
      country: 'USA'
    }
  },
  {
    id: '1',
    occupation: 'architect',
    address: {
      street: '234 Main St',
      city: 'CityTown',
      country: 'USA'
    }
  },
  {
    id: '2',
    occupation: 'architect',
    address: {
      street: '345 Main St',
      city: 'CityTown',
      country: 'USA'
    }
  },
  {
    id: '3',
    occupation: 'architect',
    address: {
      street: '456 Main St',
      city: 'CityTown',
      country: 'USA'
    }
  },
];



// tests 
function testMergeDataStreams(stream1, stream2) {
  var expected = stream1.map(function (item) {
    return _.assign(
      item, stream2.find(function (item2) { return item.id === item2.id; }));
  });

  var actual = mergeDataStreams(stream1, stream2);

  var passing = actual && expected.map(function (item) {
    return _.isEqual(
      item,
      actual.find(function (_item) { return _item.id === item.id; })
    );
  }).every(function (result) { return result; });

  if (passing) {
    console.log('SUCCESS! mergeDataStreams works');
  }

  else {
    console.log('FAILURE! mergeDataStreams not working');
  }
}

testMergeDataStreams(dataSource1, dataSource2);