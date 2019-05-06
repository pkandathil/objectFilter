const { objectFilter } = require('../app')

describe('Object Filtering', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('throw error for missing input object', () => {
    const filter = 'asdf'
    try {
      objectFilter(null, filter)
    } catch (error) {
      expect(error.message).toEqual('Missing input object')
    }
  })

  it('throw error for missing filter', () => {
    const inputObject = 'asdf'
    try {
      objectFilter(inputObject, null)
    } catch (error) {
      expect(error.message).toEqual('Missing filter')
    }
  })

  it('filter items in array by field value', () => {
    const inputObject = [
      {
        value: "1"
      },
      {
        value: "2"
      },
      {
        value: "3"
      },
      {
        value: "4"
      }
    ]
    const filter = 'value=1,3'
    const result = objectFilter(inputObject, filter)
    expect(result.length).toEqual(2)
  })

  it('filter items in object with array by field value', () => {
    const inputObject = {
        items: [
          {
            value: "1"
          },
          {
            value: "2"
          },
          {
            value: "3"
          },
          {
            value: "4"
          }
      ]
    }
    const filter = 'items.value=1,3'
    const result = objectFilter(inputObject, filter)
    expect(result.items.length).toEqual(2)
  })

  it('filter items in object with array by field value', () => {
    const inputObject = {
      cart: {
          items: [
          {
            value: "1"
          },
          {
            value: "2"
          },
          {
            value: "3"
          },
          {
            value: "4"
          }
        ]
      },
      test: {id: 1}
    }
    const filter = 'cart.items.value=1,3'
    const result = objectFilter(inputObject, filter)
    expect(result.cart.items.length).toEqual(2)
  })

  it('filter items in more complex object with array by field value', () => {
    const inputObject = {
      "ShoppingCart": {
        "id": "123-456-789",
        "characteristic": [
          {
            "name": "123456",
            "value": null,
            "displayName": "Test char 1",
            "originalDisplayName": "Test char 1",
            "description": "Test characteristic object 1"
          },
          {
            "name": "78910",
            "value": null,
            "displayName": "Test char 2",
            "originalDisplayName": "Test char 2",
            "description": "Test characteristic object 2"
          }
        ],
        "cartItem": [
          {
            "action": "Add",
            "id": "1",
            "product": {
              "id": null,
              "displayName": "Test product 1",
              "originalName": "Test product 1",
              "characteristic": [
                {
                  "name": "Testing 1",
                  "value": "12"
                },
                {
                  "name": "Testing 2",
                  "value": "34"
                }
              ]
            }
          },
          {
            "action": "Add",
            "id": "2",
            "product": {
              "id": null,
              "displayName": "Test product 2",
              "originalName": "Test product 2",
              "characteristic": [
                {
                  "name": "Testing 3",
                  "value": "56"
                },
                {
                  "name": "Testing 4",
                  "value": "78"
                }
              ]
            }
          }
        ]
      }
    }
    const filter = 'ShoppingCart.cartItem.product.characteristic.value=34,56'
    const result = objectFilter(inputObject, filter)
    expect(result.ShoppingCart.cartItem[0].product.characteristic.length).toEqual(1)
  })

  it('throws an exception due to an invalid filter', () => {
    const inputObject = {
      cart: {
          items: [
          {
            value: "1"
          },
          {
            value: "2"
          },
          {
            value: "3"
          },
          {
            value: "4"
          }
        ]
      },
      test: {id: 1}
    }
    const filter = 'cart.value=1,3'
    try {
      const result = objectFilter(inputObject, filter)
    } catch (error) {
      expect(error.message).toEqual('Invalid filter')
    }
  })
})