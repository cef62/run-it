#!/usr/bin/env node

/* @flow */

import yargs from 'yargs'

yargs.commandDir('./app/commands').demandCommand().help().argv
