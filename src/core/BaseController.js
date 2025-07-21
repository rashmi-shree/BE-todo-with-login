class BaseController {
    constructor(service){
        this.service = service
    }

    async getAll(req,res){
        try{
            const data = await this.service.getAll()
            res.json(data)
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    }

    async getById(req,res){
        try{
            const data = await this.service.getById(req.params.id)
            if(!data) return res.status(404).json({message:"Not Found"})
            res.json(data)
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    }
    async create(req, res){
        try{
            const data = await this.service.create(req.body)
            res.status(201).json(data)
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    }
    async update(req,res){
        try{
            const data = await this.service.update(req.params.id, req.body)
            res.json(data)
        }
        catch(err){
            res.status(500).json({error:err.message})
        }
    }
     async delete(req, res) {
        try {
        await this.service.delete(req.params.id);
        res.status(204).send();
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }
}

module.exports = BaseController