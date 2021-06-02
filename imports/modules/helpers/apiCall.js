const callAPI = (method, ...params) => new Promise((resolve, reject) => {
    Meteor.call(method, ...params, (err, res) => {
      if (err) reject(err.reason)
      resolve(res)
    })
})
  
export default callAPI