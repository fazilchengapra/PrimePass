import { render } from 'less'
import { Provider } from 'react-redux'
import { it, expect, describe, vi } from 'vitest'

vi.mock('api/citiesList', () =>({
    getCities: vi.fn(().mockResolvedValue({data:{data:[{name:"Kerala"}, {name:"Tamil Nadu"}]}}))
}))

