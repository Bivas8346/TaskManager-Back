const TaskModel = require("../Model/Taskmodel");

const create = async (req, res) => {
  try {
    const user = await new TaskModel({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
    });
    const user_data = await user.save();
    res
      .status(200)
      .json({ success: true, messsage: "added task data", data: user_data });
  } catch (error) {
    res.status(400).json({ success: false, message: "user not save" });
  }
};
const watch = async (req, res) => {
  try {
    const alldata = await TaskModel.find();
    res
      .status(200)
      .json({ success: true, messsage: "get all task data", data: alldata });
  } catch (error) {
    res.status(400).json({ success: false, message: "task not save" });
  }
};
const edit = async (req, res) => {
  const id = req.params.id;
  try {
    const edituser = await TaskModel.findById(id);
    res
      .status(200)
      .json({ success: true, messsage: "get all task data", data: edituser });
  } catch {
    res.status(400).json({ success: false, messsage: "task not save" });
  }
};

const update = (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const status = req.body.status;

    TaskModel.findById(id).then((userdata) => {
      (userdata.title = title),
        (userdata.description = description),
        (userdata.priority = priority),
        (userdata.status = status);

      return userdata.save().then((result) => {
        res
          .status(200)
          .json({
            status: true,
            message: "data updated succesfully...",
            data: result,
          });
      });
    });
  } catch (error) {
    res
      .status(400)
      .json({
        status: false,
        message: "Something went wrong. Please recheck your code !",
      });
  }
};

const completed = async (req, res) => {
  try {
      const taskData = await TaskModel.aggregate([
          {
              $match: { status: 'COMPLETED' }
          }
      ])
      res.status(200).send({ success: true, msg: "All completed task data", data: taskData })
  } catch (error) {
      res.status(201).json({ error })
  }

}

const panding = async (req, res) => {
  try {
      const taskData = await TaskModel.aggregate([
          {
              $match: { status: 'PANDING' }
          }
      ])
      res.status(200).send({ success: true, msg: "All completed task data", data: taskData })
  } catch (error) {
      res.status(201).json({ error })
  }

}

const deleted = (req, res) => {
  try {
    TaskModel.findByIdAndDelete({ _id: req.params.id }).then((result) => {
      res
        .status(200)
        .json({ status: true, message: "data deleted succesfully..." });
    });
  } catch (error) {
    res
      .status(400)
      .json({
        status: false,
        message: "Something went wrong. Please recheck your code !",
      });
  }
};
module.exports = {
  create,
  watch,
  edit,
  update,
  deleted,
  completed,
  panding,
};
