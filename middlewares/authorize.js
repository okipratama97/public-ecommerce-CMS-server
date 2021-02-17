module.exports = async function (req, _, next) {
  try {
    let id = req.params.id

    if (req.user.role !== 'Admin') throw { name: 'error_403_access_forbidden' }

    next()
  } catch (err) {
    next(err)
  }
}
