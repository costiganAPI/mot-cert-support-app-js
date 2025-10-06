import { expect } from '@wdio/globals'

describe('User feature', () => {

    it('shows users in list', async () => {
        await browser.url('http://localhost:3000')

        await $('input[name="email"]').setValue('admin@test.com')
        await $('input[name="password"]').setValue('password123')
        await $('button').click()

        await $('a[href="#/manage/users"]').click()

        const projects = await $$('tbody tr')

        expect(projects.length).toBeGreaterThan(0)
    })

})
