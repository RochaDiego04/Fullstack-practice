import { createRequest, createResponse } from 'node-mocks-http'
import { body } from 'express-validator'
import { handleInputErrors } from '../../../middleware/validation'

describe('Validation Middleware - handleInputErrors', () => {
    it('should call next() when there are no validation errors', async () => {
        const req = createRequest({
            body: { email: 'test@test.com' }
        })
        const res = createResponse()
        const next = jest.fn()

        await body('email').isEmail().withMessage('Invalid email').run(req)
        handleInputErrors(req, res, next)

        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
        expect(res.statusCode).toBe(200)
    })

    it('should respond with every failure at once, not just the first', async () => {
        const req = createRequest({
            body: { email: 'not-an-email', password: 'short' }
        })
        const res = createResponse()
        const next = jest.fn()

        await body('email').isEmail().withMessage('Invalid email').run(req)
        await body('password').isLength({ min: 8 }).withMessage('Password too short').run(req)
        handleInputErrors(req, res, next)

        const data = res._getJSONData()
        expect(res.statusCode).toBe(400)
        expect(next).not.toHaveBeenCalled()
        // This is the only endpoint that can report several failures at once,
        // and the only reason the API has a plural error shape at all.
        expect(data.errors.length).toBeGreaterThan(1)
        expect(data).toEqual({ errors: ['Invalid email', 'Password too short'] })
    })
})
