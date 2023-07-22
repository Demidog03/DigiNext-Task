import {
    addEntity,
    deleteEntityById,
    getAllEntities,
    getEntityById,
    updateEntityById
} from "../controllers/entity.controller.js";

export default function entityRoutes(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/entities/entity", addEntity);
    app.get("/entities", getAllEntities);
    app.get("/entities/entity/:id", getEntityById);
    app.post("/entities/entity/:id", deleteEntityById);
    app.put("/entities/entity/:id", updateEntityById);
};
