import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const portalStatusRouter = express.Router();

portalStatusRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const results = await db("sfa.portal_status")
            .select(
                'sfa.portal_status.id',
                'sfa.portal_status.description',
                'sfa.portal_status.is_active',
            )
            .orderBy('sfa.portal_status.description');

        if (results) {

            if (filter !== 'false') {
                return res.status(200).json({ success: true, data: results.filter(c => c.is_active), })
            } else {
                return res.status(200).json({ success: true, data: [...results], });
            }

        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});

portalStatusRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const { is_active, description = "", } = req.body;
        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.portal_status")
                .select('description')
                .where({ description: trimDescription });

            if (verify?.length) return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

            const resInsert = await db("sfa.portal_status")
                .insert({ description: trimDescription, is_active })
                .returning("*");

            if (resInsert) {
                return res.status(201).json({ success: true, data: resInsert, });
            } else {
                return res.status(400).send();
            }

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    });

portalStatusRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.portal_status")
            .update({ is_active })
            .where({ id })
            .returning("*")
            .then((resp: any) => {
                if (resp[0]?.is_active === is_active && resp[0]?.id === Number(id)) {
                    res.status(202).send({ wasUpdated: true, ...resp[0] });
                } else {
                    res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                }
            })
            .catch(function (e: any) {
                console.log(e);
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            });
    });

portalStatusRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.portal_status")
                .select('id', 'description')
                .where({ description: trimDescription });

            if (verify?.[0]?.description.toLowerCase() === trimDescription.toLowerCase() &&
                verify?.[0]?.id !== Number(id))
                return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }

        db("sfa.portal_status")
            .update({ description: trimDescription })
            .where({ id })
            .returning("*")
            .then((resp: any) => {
                if (resp[0]?.id === Number(id)) {
                    res.status(202).send({ wasUpdated: true, ...resp[0] });
                } else {
                    res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                }
            })
            .catch(function (e: any) {
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                console.log(e);
            });
    });

portalStatusRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";
        try {

            const verifyRecord: any = await db("sfa.portal_status")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;

            const deleteRecord: any = await db("sfa.portal_status")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ wasDelete: true })
                :
                res.status(404).send({ wasDelete: false, message: `The record "${verifyRecord.description}" does not exits` });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ wasDelete: false, message: `"${description}" cannot be deleted because it is in use.` });
            }

            return res.status(409).send({ wasDelete: false, message: "Error to Delete" });
        }
    }
);