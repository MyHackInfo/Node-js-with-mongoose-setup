const Tour = require('./../models/tourModel');


// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try{
  const tours = await Tour.find();
  
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch(erro){
    res.status(404).json({
      status:"Data Not Found",
      Message:"don't have any data"
    })
  }
};

exports.getTour = async (req, res) => {
  try{
    const id = req.params.id;

    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });

  } catch(erro){
    res.status(404).json({
      status:"Data Not Found",
      Message:"don't have any data"
      
    })
  }
};

exports.createTour = async (req, res) => {
  // console.log(req.body);
  try {
      const newTour = await Tour.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });

  }
  catch(error){
    
      res.status(400).json({
        status:"fail",
        message:error
      })
  }

};

exports.updateTour = async (req, res) => {

  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
      runValidators:true
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
  }
  catch(erro){
    res.status(400).json({
      status:"fail",
      message:erro
    })
  }
};

exports.deleteTour = async (req, res) => {
  try{
  const tour = await Tour.deleteOne({ _id: req.params.id });
  res.status(204).json({
    status: 'success',
    data: null
  });
  }
    catch(erro){
      res.status(404).json({
        status:"fail",
        Message:"Data not delte"
        
      })
    }
};
