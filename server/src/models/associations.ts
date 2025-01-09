import Services from "./services";
import ServicesDescription from "./servicesDescription";

Services.hasMany(ServicesDescription, {
    as: 'servicesDescription',
    foreignKey: 'categoryId',
  });

  ServicesDescription.belongsTo(Services, {
    as: 'services',
    foreignKey: 'categoryId',
  });

  export { Services };
export { ServicesDescription };