'use strict'

import { expect, use } from 'chai'
import { Map, List, OrderedSet, Set, Stack } from 'immutable'

import { plugin } from '../../src/helpers/ChaiModel'
use(plugin)

describe('ChaiSpec', () => {

  describe('"empty" property', () => {
    it('should check immutable objects correctly', () => {
      // check empty collections
      expect(List()).to.be.empty
      expect(Map()).to.be.empty
      expect(OrderedSet()).to.be.empty
      // check non-empty collections
      expect(List.of(1, 2, 3)).to.be.not.empty
      expect(Map({ a: 'x' })).to.be.not.empty
      expect(OrderedSet([ false ])).to.be.not.empty
    })
    it('should check native JS objects correctly', () => {
      expect([]).to.be.empty
      expect([1, 2]).to.be.not.empty
    })
  })

  describe('"deep equals" method', () => {
    it('should check immutable list correctly', () => {
      expect(List.of(1, 2)).to.be.eq(List.of(1, 2))
      expect(List.of(1, 2)).to.eql(List.of(1, 2))
      expect(List.of(1, 2)).to.eqls(List.of(1, 2))
      expect(List.of(1, 2)).to.equal(List.of(1, 2))
      expect(List.of(1, 2)).to.equals(List.of(1, 2))

      expect(Map({ x: 'abc' })).to.eq(Map({ x: 'abc' }))
    })
    it('should check immutable map correctly', () => {
      expect(Map({ x: 'abc' })).to.eq(Map({ x: 'abc' }))
      expect(Map({ x: 'abc' })).to.eql(Map({ x: 'abc' }))
      expect(Map({ x: 'abc' })).to.eqls(Map({ x: 'abc' }))
      expect(Map({ x: 'abc' })).to.equal(Map({ x: 'abc' }))
      expect(Map({ x: 'abc' })).to.equals(Map({ x: 'abc' }))
    })
    it('should check mixing immutable with native object', () => {
      const foo = { x: { a: 10 }, y: 'foo' }
      expect(Map(foo)).to.eq(Map(foo))
      expect(List.of(foo)).to.eq(List.of(foo))
    })
    it('should not check if either given value is not immutable', () => {
      expect(List.of(1, 2)).to.not.eq([1, 2])
    })
  })

  describe('"contain" method', () => {
    it('should check immutable list correctly', () => {
      expect(List.of(1, 2)).to.include(1)
      expect(List.of(1, 2)).to.includes(1)
      expect(List.of(1, 2)).to.contain(1)
      expect(List.of(1, 2)).to.contains(1)
    })
    it('should check immutable mixed with native object', () => {
      expect(List.of({ a: 10 }, { a: 5 })).contain({ a: 10 })
    })
  })

  describe('"keys" method', () => {
    it('should check immutable map have single key correctly', () => {
      expect(Map({ foo: 1 })).to.have.key('foo1')
      expect(Map({ foo: 1, bar: 2 })).to.have.keys('foo', 'bar')
      expect(Map({ foo: 1, bar: 2 })).to.have.keys(List(['bar', 'foo']))
      expect(Map({ foo: 1, bar: 2 })).to.have.keys(Set(['bar', 'foo']))
      expect(Map({ foo: 1, bar: 2 })).to.have.keys(Stack(['bar', 'foo']))
      expect(Map({ foo: 1, bar: 2 })).to.have.keys(['bar', 'foo'])
      expect(Map({ foo: 1, bar: 2 })).to.have.any.keys('foo', 'not-foo')
      expect(Map({ foo: 1, bar: 2 })).to.have.all.keys('foo', 'bar')
    })
    it('should perform the same checking for all alias', () => {
      expect(Map({ x: 'foo', y: 'bar' })).to.include.keys('x')
      expect(Map({ x: 'foo', y: 'bar' })).to.includes.keys('x')
      expect(Map({ x: 'foo', y: 'bar' })).to.contain.keys('x')
      expect(Map({ x: 'foo', y: 'bar' })).to.contains.keys('x')
    })
    it('should fail if the expected argument is a JS object', () => {
      // We should try to avoid such magic
      const fn = () => { expect(Map({ foo: 1 })).to.have.keys({ 'bar': 6 }) }
      expect(fn).to.throws(/Invalid expected keys/)
    })
    it('should fail if the expected argument is a Map instance', () => {
      // We should try to avoid such magic
      const fn = () => { expect(Map({ foo: 1 })).to.have.keys(Map({ 'bar': 6 })) }
      expect(fn).to.throws(/Invalid expected keys/)
    })
    it('should fail if there is no expected key specified', () => {
      const fn = () => { expect(Map({ foo: 1 })).to.have.keys() }
      expect(fn).to.throws(/keys required/)
    })
  })

  describe('collection "sizeOf" method', () => {
    it('should check immutable collections correctly', () => {
      expect(List([1, 2, 3])).to.have.sizeOf(3)
      expect(Set([1, 2, 3])).to.have.sizeOf(3)
      expect(Stack([1, 2, 3])).to.have.sizeOf(3)
      expect(Map({ x: 'a', y: 'b' })).to.have.sizeOf(2)
    })
    it('should check native JS array correctly', () => {
      expect([1, 2, 3, 4]).to.have.sizeOf(4)
    })
  })

  describe('collection "length" method', () => {
    it('should check immutable collections correctly', () => {
      expect(List([1, 2, 3])).to.have.lengthOf(3)
      expect(Set([1, 2, 3])).to.have.lengthOf(3)
      expect(Stack([1, 2, 3])).to.have.lengthOf(3)
      expect(Map({ x: 'a', y: 'b' })).to.have.lengthOf(2)
    })
    it('should check native JS array correctly', () => {
      expect([1, 2, 3, 4]).to.have.lengthOf(4)
    })
    it('should check collection size (greater than or equals) given value', () => {
      expect(List([1, 2, 3])).to.have.length.gte(3)
      expect(List([1, 2, 3])).to.have.length.gte(2)
      expect(List([1, 2, 3])).to.not.have.length.gte(4)
      expect(List([1, 2, 3])).to.not.have.length.gte(5)
    })
    it('should perform collection size (greater than or equals) checking for all alias', () => {
      expect(List([1, 2, 3])).to.have.length.least(3)
    })
    it('should check collection size (less than or equals) given value', () => {
      expect(List([1, 2, 3])).to.have.length.lte(3)
      expect(List([1, 2, 3])).to.have.length.lte(4)
      expect(List([1, 2, 3])).to.not.have.length.lte(2)
      expect(List([1, 2, 3])).to.not.have.length.lte(1)
    })
    it('should perform collection size (less than or equals) checking for all alias', () => {
      expect(List([1, 2, 3])).to.have.length.most(3)
    })
    it('should check collection size (greater than) given value', () => {
      expect(List([1, 2, 3])).to.have.length.gt(2)
      expect(List([1, 2, 3])).to.have.length.gt(1)
      expect(List([1, 2, 3])).to.not.have.length.gt(3)
      expect(List([1, 2, 3])).to.not.have.length.gt(4)
    })
    it('should perform collection size (greater than) checking for all alias', () => {
      expect(List([1, 2, 3])).to.have.length.above(2)
      expect(List([1, 2, 3])).to.have.length.greaterThan(2)
    })
    it('should check collection size (less than) given value', () => {
      expect(List([1, 2, 3])).to.have.length.lt(4)
      expect(List([1, 2, 3])).to.have.length.lt(5)
      expect(List([1, 2, 3])).to.not.have.length.lt(3)
      expect(List([1, 2, 3])).to.not.have.length.lt(2)
    })
    it('should perform collection size (less than) checking for all alias', () => {
      expect(List([1, 2, 3])).to.have.length.below(4)
      expect(List([1, 2, 3])).to.have.length.lessThan(4)
    })
  })

})