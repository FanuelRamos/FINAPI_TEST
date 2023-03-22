import AccountGateway from '../../gateway/account-gateway'
import AddAccountUseCase from './add-account-usecase'

const expectedOutput = {
  name: 'any_name',
  burth: new Date(),
  country: 'any_country',
  city: 'any_city',
  address: 'any_address',
  postalCode: '0000',
  phone: '+244939781000',
  email: 'any_email@mail.com',
  createdAt: new Date(),
  updatedAt: new Date()
}

const MockRepository = (): AccountGateway => {
  return {
    find: jest.fn(),
    findById: jest.fn(),
    add: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    update: jest.fn()
  }
}

type sutTypes = {
  repository: AccountGateway
  sut: AddAccountUseCase
}

const makeSut = (): sutTypes => {
  const repository = MockRepository()
  const sut = new AddAccountUseCase(repository)

  return {
    sut,
    repository
  }
}

describe('AddAccountUseCase unit test', () => {
  test('Should cretae a new account', async () => {
    const { sut, repository } = makeSut()

    const input = {
      name: 'any_name',
      burth: new Date(),
      country: 'any_country',
      city: 'any_city',
      address: 'any_address',
      postalCode: '0000',
      phone: '+244939781000',
      email: 'any_email@mail.com'
    }

    const output = await sut.execute(input)

    expect(repository.add).toHaveBeenCalledTimes(1)
    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.country).toBe(input.country)
    expect(output.city).toBe(input.city)
    expect(output.address).toBe(input.address)
    expect(output.postalCode).toBe(input.postalCode)
    expect(output.phone).toBe(input.phone)
    expect(output.email).toBe(input.email)
  })
})
