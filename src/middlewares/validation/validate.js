
const validate = (schema, typeSchema = "body") => {

    return async (req, res, next) => {
      try {  
        const { typeRequired } = req
  
        const validated = await schema(typeRequired).validateAsync(req[typeSchema]);
  
        req[typeSchema] = validated;
  
        next();
  
      } catch (error) {
        next(error);
      }
    }
  
  };
  
  module.exports = validate;
  