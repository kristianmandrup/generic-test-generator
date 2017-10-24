import {
  concat,
  projConcat,
  createConcat,
  args,
  method
} from './_base'

const commitMethod = {
  args: projConcat('123')
}

module.exports = {
  apiName: 'commit',
  methods: {
    'approve': commitMethod,
    disApprove: commitMethod,
    getBuildStatuses: commitMethod,
    createBuild: commitMethod,
  }
}
