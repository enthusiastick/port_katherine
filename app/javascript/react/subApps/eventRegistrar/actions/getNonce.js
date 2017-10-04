import { client } from 'braintree-web'

let createClient = authorization => {
  return client.create({
    authorization: authorization
  })
}

let getNonce = (values) => {
  return createClient(values.token)
  .then(clientInstance => { return request(clientInstance, values) })
  .then(response => { return Promise.resolve(response.creditCards[0]) })
  .catch(error => { throw error })
}

let request = (client, values) => {
  let payload = {
    creditCard: {
      cardholderName: values.cardholderName,
      number: values.cardNumber,
      cvv: values.cardVerification,
      expirationMonth: values.expirationMonth,
      expirationYear: values.expirationYear
    }
  }

  return client.request({
    endpoint: 'payment_methods/credit_cards',
    method: 'post',
    data: payload
  })
}


export { getNonce }
