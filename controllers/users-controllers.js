// require model

usersList = [
  {
    id: "1",
    name: "John",
  },
  {
    id: "2",
    name: "Peter",
  },
];

const getUsers = (req, res, next) => {
  return res.json({ users: usersList });
};

const getSingleUser = (req, res, next) => {
  const { uid } = req.params;
  const user = usersList.filter((user) => user.id === uid);
  
  return res.json({user})
};

const updateUser = (req, res, next) => {
    const {name} = req.body
    const {uid} = req.params

    const user = usersList.filter((user) => user.id === uid);

    if (user.length !== 0) {
        
        user[0].name = name
    } else {
        return res.status(404).json({error: 'ID not found!'})
    }
    return res.json({user})

}


// login

// signup


exports.getUsers = getUsers;
exports.getSingleUser = getSingleUser;
exports.updateUser = updateUser;
