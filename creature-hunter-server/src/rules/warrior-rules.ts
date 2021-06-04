import * as yup from 'yup'
import * as bcrypt from 'bcrypt'

import Warrior from '@local/models/warrior-model'

export const signUpRules = yup.object().shape({
  name: yup.string().trim().required(),
  warriorname: yup
    .string()
    .trim()
    .required()
    .min(3, 'Warriorname is too short')
    .test(
      'uniqueWarrior',
      'This warrior already exists',
      async (warriorname) => {
        const warrior = await Warrior.findOne({ warriorname })
        return !warrior
      }
    ),
  password: yup
    .string()
    .trim()
    .required()
    .min(6, 'Password is too short')
    .matches(
      /[a-zA-Z0-9@!#%]/,
      'Password can only contain Latin letters, numbers and/or [@,!,#,%].'
    ),
})

export const loginRules = yup.object().shape({
  warriorname: yup
    .string()
    .trim()
    .required()
    .test('warriornameCheck', 'Invalide warriorname', async (warriorname) => {
      const warrior = await Warrior.findOne({ warriorname })
      return !!warrior
    }),
  password: yup
    .string()
    .trim()
    .required()
    .matches(
      /[a-zA-Z0-9@!#%]/,
      'Password can only contain Latin letters, numbers and/or [@,!,#,%].'
    )
    .when('warriorname', (warriorname: string, schema: any) =>
      schema.test({
        test: async (password: string) => {
          const warrior = await Warrior.findOne({ warriorname })
          const valid = await bcrypt.compare(password, warrior!.password)
          return valid
        },
        message: 'Invalid password',
      })
    ),
})

export const creatureRules = yup.object().shape({
  creature: yup
    .string()
    .required()
    .test(
      'uppercaseCheck',
      'Creature can only accept upper case letters',
      (creature) => {
        return creature === creature!.toUpperCase()
      }
    ),
})
