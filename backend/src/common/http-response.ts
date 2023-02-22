export const http_response = {
  _200(res = {}) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*', //  Allow all methods
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: JSON.stringify(res)
    }
  },

  _201(data = {}) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      },
      statusCode: 201,
      body: JSON.stringify(data)
    }
  },

  _400(data = {}) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: JSON.stringify(data)
    }
  },

  _404(data = {}) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      },
      statusCode: 404,
      body: JSON.stringify(data)
    }
  }
}
