const { z } = require('zod')

const { handleControllerError } = require('../lib/controller-error')
const authService = require('../services/auth.service')

const registerSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    fullName: z.string().trim().min(1, 'Full name is required').max(100),
})

const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(1, 'Password is required'),
})

function buildRequestContext(req) {
    return {
        ip: req.ip,
        requestId: req.requestId,
        userAgent: req.get('user-agent') || null,
    }
}

async function register(req, res) {
    try {
        const input = registerSchema.parse(req.body)
        const result = await authService.register(input, buildRequestContext(req))

        return res.status(201).json({
            data: result,
        })
    } catch (error) {
        return handleControllerError(req, res, error)
    }
}

async function login(req, res) {
    try {
        const input = loginSchema.parse(req.body)
        const result = await authService.login(input, buildRequestContext(req))

        return res.status(200).json({
            data: result,
        })
    } catch (error) {
        return handleControllerError(req, res, error)
    }
}

async function logout(req, res) {
    try {
        const result = await authService.logout({
            userId: req.user.userId,
            context: buildRequestContext(req),
        })

        return res.status(200).json({
            data: result,
        })
    } catch (error) {
        return handleControllerError(req, res, error)
    }
}

module.exports = {
    register,
    login,
    logout,
}
