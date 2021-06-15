const { Router } = require('express')
const router = Router()
const shortid = require('shortid')
const config = require ('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')


router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const code = shortid.generate()
        const to = baseUrl + '/t/' + code
        const { from } = req.body
        const existing = await Link.findOne( { from })
        
        if(existing) {
            return res.json({ link: existing })
        }

        const link = new Link({
            from, to, code, owner: req.user.userId
        })

        await link.save()
        res.status(201).json({ link })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find( { owner: req.user.userId })
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router