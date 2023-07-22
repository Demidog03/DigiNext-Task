import Entity from "../models/entity.model.js";

export const addEntity = async(req, res) => {
    try {
        const {name, coordinate, labels} = req.body;
        const entity = new Entity({
            name,
            coordinate,
            labels
        });
        await entity.save()
        res.status(201).json(entity);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getAllEntities = async (req, res) => {
    try {
        const entities = await Entity.find().exec();
        res.status(200).json(entities);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getEntityById = async (req, res) => {
    try {
        const entityId = req.params.id;
        const entity = await Entity.findById(entityId);

        if (!entity) {
            return res.status(404).json({ message: "Entity not found." });
        }

        res.status(200).json(entity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteEntityById = async (req, res) => {
    try {
        const entityId = req.params.id;
        const deletedEntity = await Entity.findByIdAndDelete(entityId).exec();

        if (!deletedEntity) {
            return res.status(404).json({ message: "Entity not found." });
        }

        res.status(200).json({ message: "Entity deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateEntityById = async (req, res) => {
    try {
        const entityId = req.params.id;
        const { name, coordinate, labels } = req.body;

        const updatedEntity = await Entity.findByIdAndUpdate(
            entityId,
            { name, coordinate, labels },
            { new: true }
        ).exec();

        if (!updatedEntity) {
            return res.status(404).json({ message: "Entity not found." });
        }

        res.status(200).json(updatedEntity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
