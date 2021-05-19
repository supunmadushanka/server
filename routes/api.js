const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const emailExistence = require('email-existence');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 5;
const app = express();
const sql = require('mssql');

const sqlconfig = {
    db: '*sql.DB',
    user: 'supun',
    password: 'Ranjani1970#',
    server: 'mysport-codefreks.database.windows.net',
    database: 'mysport',
    port: 1433,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('from API route')
})

router.get('/teams', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from getteamview1 where instituteId=@institute order by teamName', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/coaches', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from getcoachview1 where instituteId=@institute order by coachFName', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/players', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from playerview where instituteId=@institute order by playerFName', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/sports', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Sport', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/structure', function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Struture', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/teamplayers', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from Player p, Team_Player tp where p.userId = tp.playerId and tp.teamId=@teamId order by playerFName', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/teamdetails', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from getteamview1 g, institute i where g.instituteId=i.instituteId and g.teamId=@teamId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/teamachieve', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from Achievements_Team where teamId=@teamId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/addachieve', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('teamId', sql.Int, teamId)
            .input('teamAchievements', sql.VarChar(120), req.body.achievecontent)
            .execute('Addachieve')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.delete('/deleteachieve/:achieveId', verifyToken, function(req, res) {
    var achieveId = req.params.achieveId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('achieveId', sql.Int, achieveId)
            .execute('deleteachieve')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.get('/getteamtourupcoming', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from teamtournament where teamId=@teamId AND tournamentstatus is null', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getteamtourongoing', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from teamtournament where teamId=@teamId AND tournamentstatus=1', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getteamtourfinished', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from teamtournament where teamId=@teamId AND tournamentstatus=0', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/addplayerview', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('teamId', sql.Int, teamId)
            .output('strutureId', sql.VarChar(10))
            .output('instituteId', sql.Int)
            .execute('getStructureId', (err, result) => {
                if (err) {} else {
                    sql.connect(sqlconfig).then(pool => {
                        let connection = sql.connect(sqlconfig, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                var request = new sql.Request();
                                request
                                    .input('teamId', sql.Int, teamId)
                                    .input('structureId', sql.VarChar(10), result.output.strutureId)
                                    .input('instituteId', sql.Int, result.output.instituteId)
                                    .query('select * from addplayerview a where strutureId=@structureId AND not exists (select * from Team_Player tp where teamId=@teamId AND a.userId=tp.playerId) AND a.instituteId=@instituteId', function(er, recordset) {
                                        if (err)
                                            console.log(er);
                                        else {
                                            res.send(recordset.recordset);
                                        }
                                    });
                            }
                        });
                    })
                }
            })
    })

})

router.post('/addplayer', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    var playerId = req.query.playerId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('teamId', sql.Int, teamId)
            .input('playerId', sql.Int, playerId)
            .execute('addplayerteam')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/removeplayer', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    var playerId = req.query.playerId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('teamId', sql.Int, teamId)
            .input('playerId', sql.Int, playerId)
            .execute('removeplayerteam')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/editteam', verifyToken, function(req, res) {
    var teamid = req.query.teamid
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('teamid', sql.Int, teamid)
            .input('teamName', sql.VarChar(20), req.body.TeamName)
            .input('coachId', sql.Int, req.body.Coach)
            .execute('editteam')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/addsession', verifyToken, function(req, res) {
    var teamid = req.query.teamid
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('teamid', sql.Int, teamid)
            .input('sessionDateTime', sql.VarChar(20), req.body.DateTime)
            .input('venue', sql.VarChar(50), req.body.Venue)
            .execute('addsession')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/addsessiondescrip', verifyToken, function(req, res) {
    var teamid = req.query.teamid
    var sessionId = req.query.sessionId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('teamid', sql.Int, teamid)
            .input('sessionId', sql.Int, sessionId)
            .input('sessionSummery', sql.VarChar(500), req.body.description)
            .execute('addsessiondescript')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.get('/getupcomingsession', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .input('state', sql.VarChar(10), 'upcoming')
                    .query('select * from Practice_Session where teamId=@teamId AND sessionState=@state', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getfinishedsession', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .input('state', sql.VarChar(10), 'finished')
                    .query('select * from Practice_Session where teamId=@teamId AND sessionState=@state', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/finishsession', verifyToken, function(req, res) {
    var sessionId = req.query.sessionId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('sessionId', sql.Int, sessionId)
            .execute('finishsession')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/createtournament', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('tournamentName', sql.VarChar(100), req.body.TournamentName)
            .input('sportId', sql.VarChar(10), req.body.Sport)
            .input('under15male', sql.VarChar(5), req.body.under15male)
            .input('under15female', sql.VarChar(5), req.body.under15female)
            .input('under17male', sql.VarChar(5), req.body.under17male)
            .input('under17female', sql.VarChar(5), req.body.under17female)
            .input('under19male', sql.VarChar(5), req.body.under19male)
            .input('under19female', sql.VarChar(5), req.body.under19female)
            .execute('createtournament')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.get('/getcreatedtournament', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Tournament_Institute ti, Tournament t, Sport s where t.tournementId=ti.tournementId and t.sportId=s.sportId and ti.instituteId=@institute and tournamentstatus is null', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getstartedtournament', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Tournament_Institute ti, Tournament t, Sport s where t.tournementId=ti.tournementId AND t.sportId=s.sportId AND ti.instituteId=@institute AND tournamentstatus=1', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getfinishedtournament', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Tournament_Institute ti, Tournament t, Sport s where t.tournementId=ti.tournementId AND t.sportId=s.sportId AND ti.instituteId=@institute AND tournamentstatus=0', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getselectedtournament', verifyToken, function(req, res) {
    var tournamentId = req.query.tournamentId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournamentId', sql.Int, tournamentId)
                    .query('select * from Tournament t, Sport s where t.tournementId=@tournamentId AND t.sportId=s.sportId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getnewtournament', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Tournament t,Sport s where not exists( select * from Tournament_Institute ti where instituteId=@institute AND ti.tournementId=t.tournementId) AND t.sportId=s.sportId AND t.tournamentstatus is null', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.post('/jointournament', verifyToken, (req, res) => {
    var Email = req.get('Email')
    var tournementId = req.query.tournementId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('tournementId', sql.Int, tournementId)
            .execute('jointour')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.get('/getfixturefirstteam', verifyToken, function(req, res) {
    var tournamentId = req.query.tournamentId
    var strutureId = req.query.strutureId
    if (strutureId == '') {
        sql.connect(sqlconfig).then(pool => {
            let connection = sql.connect(sqlconfig, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var request = new sql.Request();
                    request
                        .input('tournamentId', sql.Int, tournamentId)
                        .input('strutureId', sql.Int, strutureId)
                        .query('select * from Tournament_Team tt,Team t,Institute i,Struture s where t.teamId=tt.teamId AND tt.instituteId=i.instituteId AND tournementId=@tournamentId ANd tt.strutureId=s.strutureId', function(er, recordset) {
                            if (err)
                                console.log(er);
                            else {
                                res.send(recordset.recordset);
                            }
                        });
                }
            });
        })
    } else {
        sql.connect(sqlconfig).then(pool => {
            let connection = sql.connect(sqlconfig, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var request = new sql.Request();
                    request
                        .input('tournamentId', sql.Int, tournamentId)
                        .input('strutureId', sql.Int, strutureId)
                        .query('select * from Tournament_Team tt,Team t,Institute i where tt.strutureId=@strutureId AND t.teamId=tt.teamId AND tt.instituteId=i.instituteId AND tournementId=@tournamentId', function(er, recordset) {
                            if (err)
                                console.log(er);
                            else {
                                res.send(recordset.recordset);
                            }
                        });
                }
            });
        })
    }
})

router.get('/getupcomingfixture', verifyToken, function(req, res) {
    var tournementId = req.query.tournementId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournementId', sql.Int, tournementId)
                    .query('select * from Fixture f, Struture s where f.strutureId=s.strutureId AND tournementId=@tournementId AND fixtureState is null', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getongoingfixture', verifyToken, function(req, res) {
    var tournementId = req.query.tournementId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournementId', sql.Int, tournementId)
                    .query('select * from Fixture f, Struture s where f.strutureId=s.strutureId AND tournementId=@tournementId AND fixtureState=1', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getfinishedfixture', verifyToken, function(req, res) {
    var tournementId = req.query.tournementId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournementId', sql.Int, tournementId)
                    .query('select * from Fixture f, Struture s where f.strutureId=s.strutureId AND tournementId=@tournementId AND fixtureState=0', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/upcomingfixturedetails', verifyToken, function(req, res) {
    var fixtureId = req.query.fixtureId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('fixtureId', sql.Int, fixtureId)
                    .query('select *  from fixturesummery where fixtureId=@fixtureId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getfixtureteamplayers', verifyToken, function(req, res) {
    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('fixtureId', sql.Int, fixtureId)
                    .input('tournamentTeamId', sql.Int, tournamentTeamId)
                    .query('select * from Player_Fixture pf,Tournament_Team tt,Player p where pf.tournamentTeamId=tt.tournamentTeamId AND p.userId=pf.playerId AND tt.tournamentTeamId=@tournamentTeamId AND pf.fixtureId=@fixtureId order by PFid', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getaddfixtureplayers', verifyToken, function(req, res) {
    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('fixtureId', sql.Int, fixtureId)
            .output('teamId', sql.Int)
            .output('tournamentTeamId', sql.Int)
            .execute('getFixtureTeam', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('teamId', sql.Int, result.output.teamId)
                                .input('fixtureId', sql.Int, fixtureId)
                                .query('select * from teamPlayer tp where not EXISTS( select * from Player_Fixture pf where pf.fixtureId=@fixtureId AND pf.playerId=tp.userId) AND tp.teamId=@teamId', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getremovefixtureplayers', verifyToken, function(req, res) {
    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('fixtureId', sql.Int, fixtureId)
            .output('teamId', sql.Int)
            .output('tournamentTeamId', sql.Int)
            .execute('getFixtureTeam', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('teamId', sql.Int, result.output.teamId)
                                .input('fixtureId', sql.Int, fixtureId)
                                .query('select * from teamPlayer tp where EXISTS( select * from Player_Fixture pf where pf.fixtureId=@fixtureId AND pf.playerId=tp.userId) AND tp.teamId=@teamId', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getTotal', verifyToken, function(req, res) {
    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('fixtureId', sql.Int, fixtureId)
                    .input('tournamentTeamId', sql.Int, tournamentTeamId)
                    .query('select sum(playerScore) as sumScore,Sum(overs) as overs from Player_Fixture where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getWickets', verifyToken, function(req, res) {
    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('fixtureId', sql.Int, fixtureId)
                    .input('tournamentTeamId', sql.Int, tournamentTeamId)
                    .input('out', sql.VarChar(10), 'out')
                    .query('select count(outnotout) as wickets from Player_Fixture where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId AND outnotout=@out', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getsummery', verifyToken, function(req, res) {
    var tournamentId = req.query.tournamentId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournamentId', sql.Int, tournamentId)
                    .query('select * from tournamentsummery where tournementId=@tournamentId ORDER BY point DESC', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getinstituteinfo', verifyToken, function(req, res) {
    var instituteId = req.query.instituteId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('instituteId', sql.Int, instituteId)
                    .query('select * from institute i,Instituteadmin ia where instituteId=@instituteId AND i.userId=ia.userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getpointtable', verifyToken, function(req, res) {
    var tournamentId = req.query.tournamentId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournamentId', sql.Int, tournamentId)
                    .query('select * from pointtable where tournementId=@tournamentId ORDER BY sumpoint DESC', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getaddedinstitutes', verifyToken, function(req, res) {
    var tournamentId = req.query.tournamentId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournamentId', sql.Int, tournamentId)
                    .query('select * from Tournament_Institute ti,institute i where ti.tournementId=@tournamentId AND ti.instituteId=i.instituteId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getinstituteteamcount', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select count(teamId) as noOfTeams from Team where instituteId=@institute', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getinstitutecoachcount', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select count(userId) as noOfCoaches from Coach where instituteId=@institute', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getinstituteplayercount', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select count(userId) as noOfPlayers from Player where instituteId=@institute', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getinstituteprofile', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from institute where instituteId=@institute', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.post('/addfixtureplayer', verifyToken, (req, res) => {
    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('fixtureId', sql.Int, fixtureId)
            .output('teamId', sql.Int)
            .output('tournamentTeamId', sql.Int)
            .execute('getFixtureTeam', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('fixtureId', sql.Int, fixtureId)
                                .input('tournamentTeamId', sql.Int, result.output.tournamentTeamId)
                                .input('userId', sql.Int, userId)
                                .query('insert into Player_Fixture(fixtureId,playerID,playerPoints,playerScore,tournamentTeamId,fixtureAvaial,AvaialReason,Confirm,overs,givescore,wickets,outnotout) values(@fixtureId,@userId,null,null,@tournamentTeamId,1,null,null,null,null,null,null)', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {}
                                });
                        }
                    });
                }
            })
    }).then((res, err) => {
        console.dir('completed')
    }).catch(err => {
        console.log(err);
    })

})

router.post('/removefixtureplayer', verifyToken, (req, res) => {
    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('fixtureId', sql.Int, fixtureId)
            .output('teamId', sql.Int)
            .output('tournamentTeamId', sql.Int)
            .execute('getFixtureTeam', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('fixtureId', sql.Int, fixtureId)
                                .input('tournamentTeamId', sql.Int, result.output.tournamentTeamId)
                                .input('userId', sql.Int, userId)
                                .query('delete from Player_Fixture where playerID=@userId AND fixtureId=@fixtureId', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {}
                                });
                        }
                    });
                }
            })
    }).then((res, err) => {
        console.dir('completed')
    }).catch(err => {
        console.log(err);
    })

})

router.post('/startfixture', verifyToken, (req, res) => {
    var fixtureId = req.query.fixtureId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .execute('startfixture')
    }).then(result => {}).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/updatedescript', verifyToken, (req, res) => {
    var description = req.query.description
    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('description', sql.VarChar(1000), description)
            .input('fixtureId', sql.Int, fixtureId)
            .input('tournamentTeamId', sql.Int, tournamentTeamId)
            .execute('updatedescript')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/postponefixture', verifyToken, (req, res) => {
    var fixtureId = req.query.fixtureId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .execute('postponefixture')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.delete('/deletefixture/:fixtureId', verifyToken, (req, res) => {
    var fixtureId = req.params.fixtureId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .execute('deletefixture')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/finishfixture', verifyToken, (req, res) => {
    var fixtureId = req.query.fixtureId
    var wonteam = req.query.wonteam
    var wonscore = req.query.wonscore
    var lossteam = req.query.lossteam
    var lossscore = req.query.lossscore
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .input('wonteam', sql.Int, wonteam)
            .input('wonscore', sql.Int, wonscore)
            .input('lossteam', sql.Int, lossteam)
            .input('lossscore', sql.Int, lossscore)
            .execute('finishfixture')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/starttournament', verifyToken, function(req, res) {
    var tourId = req.body[0]
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('tournementId', sql.Int, tourId)
            .execute('starttournement')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/postponetournament', verifyToken, function(req, res) {
    var tourId = req.body[0]
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('tournementId', sql.Int, tourId)
            .execute('postponetournament')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/finishtournament', verifyToken, function(req, res) {
    var tourId = req.body[0]
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('tournementId', sql.Int, tourId)
            .execute('finishtournament')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/addplayerscore', verifyToken, function(req, res) {
    var fixtureId = req.query.fixtureId
    var playerId = req.query.currentUserId
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .input('playerID', sql.Int, playerId)
            .input('playerScore', sql.Int, req.body.playerScore)
            .input('overs', sql.Float, req.body.overs)
            .input('givescore', sql.Int, req.body.givescore)
            .input('wickets', sql.Int, req.body.wickets)
            .input('outnotout', sql.VarChar(10), req.body.status)
            .input('tournamentTeamId', sql.Int, tournamentTeamId)
            .execute('addplayerscore')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/updateextra', verifyToken, function(req, res) {
    var fixtureId = req.query.fixtureId
    var extras = req.query.extras
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .input('extras', sql.Int, extras)
            .input('tournamentTeamId', sql.Int, tournamentTeamId)
            .execute('addeextra')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/registerfixture', verifyToken, function(req, res) {
    var tournamentId = req.query.tournementId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureDate', sql.Date, req.body.fixtureDate)
            .input('fixtureTime', sql.VarChar(10), req.body.fixtureTime)
            .input('venue', sql.VarChar(20), req.body.fixtureVenue)
            .input('tournementId', sql.Int, tournamentId)
            .input('strutureId', sql.VarChar(10), req.body.FixtureStructure)
            .input('firstTournamentTeamId', sql.Int, req.body.FirstTeam)
            .input('secondTournamentTeamId', sql.Int, req.body.SecondTeam)
            .execute('registerfixture')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/editfixture', verifyToken, function(req, res) {
    var fixtureId = req.query.fixtureId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureDate', sql.Date, req.body.fixtureDate)
            .input('fixtureTime', sql.VarChar(10), req.body.fixtureTime)
            .input('venue', sql.VarChar(50), req.body.fixtureVenue)
            .input('fixtureId', sql.Int, fixtureId)
            .execute('editfixture')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.get('/getadminprofile', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Instituteadmin where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/editadminprofile', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userID', sql.VarChar(50), userId)
            .input('adminFName', sql.VarChar(20), req.body.firstNameAdmin)
            .input('adminLName', sql.VarChar(20), req.body.lastNameAdmin)
            .input('adminAddress', sql.VarChar(100), req.body.addressAdmin)
            .input('adminTeliNo', sql.Int, req.body.teleNoAdmin)
            .execute('editadminprofile')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/savemessage', verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('messageContent', sql.VarChar(500), req.body.messageContent)
            .input('messageDateTime', sql.VarChar(30), req.body.messageDateTime)
            .input('teamId', sql.Int, req.body.teamId)
            .input('userId', sql.Int, req.body.userId)
            .input('userName', sql.VarChar(30), req.body.userName)
            .input('RoleId', sql.VarChar(10), req.body.RoleId)
            .execute('savemessage')
    }).then(result => {}).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.get('/getmessages', verifyToken, function(req, res) {
    var teamId = req.query.teamId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from Group_Message where teamId=@teamId OR teamId is null', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getstructures', verifyToken, function(req, res) {
    var tournementId = req.query.tournementId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournementId', sql.Int, tournementId)
                    .query('select * from Tournament t,Tournament_Structure st, Struture s where t.tournementId=st.tournementId and st.strutureId=s.strutureId AND t.tournementId=@tournementId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/gettourstructures', verifyToken, function(req, res) {
    var tournementId = req.query.tournamentId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournementId', sql.Int, tournementId)
                    .query('select * from Tournament_Structure ts,Struture s where tournementId=@tournementId AND s.strutureId=ts.strutureId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerId', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('Email', sql.VarChar(50), Email)
                    .query('select * from Appuser where userEmail=@Email', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getinstituteid', verifyToken, function(req, res) {
    var userEmail = req.query.userEmail
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), userEmail)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('instituteId', sql.Int, result.output.Exist)
                                .query('select * from institute where instituteId=@instituteId', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/playerteams', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .output('ui', sql.Int)
            .execute('getplayerid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .input('playerId', sql.Int, result.output.ui)
                                .query('select * from Team_Player tp,Team t,Sport s  where tp.teamId=t.teamId and t.instituteId=@institute and tp.playerId=@playerId and t.sportId=s.sportId', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.get('/getplayerteams', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from playersteam where playerId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerprofile', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Player where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeprofileplayer', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.VarChar(30), userId)
            .input('playerFName', sql.VarChar(20), req.body.firstNamePlayer)
            .input('playerLName', sql.VarChar(20), req.body.secondNamePlayer)
            .input('playerAddress', sql.VarChar(100), req.body.perAddressPlayer)
            .input('playerteleNum', sql.Int, req.body.teleNoPlayer)
            .input('playerWeight', sql.Int, req.body.weightPlayer)
            .input('playerHeight', sql.Int, req.body.heightPlayer)
            .input('playerBloodGroup', sql.VarChar(3), req.body.bloodSelect)
            .input('strutureId', sql.VarChar(10), req.body.PlayerStructure)
            .execute('updateplayer')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/changePasswordd', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, userId)
            .input('userPassword', sql.VarChar(20), req.body.password)
            .execute('changePassword')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/changePassword', verifyToken, function(req, res) {
    var userId = req.query.userId
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            sql.connect(sqlconfig).then(pool => {
                return pool.request()
                    .input('userId', sql.Int, userId)
                    .input('userPassword', sql.VarChar(500), hash)
                    .execute('changePassword')
            }).then(result => {}).catch(err => {
                console.log(err);
            })
        });
    });
    res.status(200).send({ "message": "Data received" });
})

router.post('/addachievplayer', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, userId)
            .input('playerAchievements', sql.VarChar(120), req.body.achievecontent)
            .execute('AddPlayerAchieve')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.delete("/deleteplayerachieve/:playerAchieveId", verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('playerAchieveId', sql.Int, req.params.playerAchieveId)
            .execute('deleteplayerachieve')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
});

router.post('/addstrengthplayer', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, userId)
            .input('playerStrengths', sql.VarChar(120), req.body.playerStrengths)
            .execute('AddPlayerStrength')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.delete("/deleteplayerstrength/:strengthId", verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('strengthId', sql.Int, req.params.strengthId)
            .execute('deleteplayerstrength')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
});

router.delete("/removeinstitute/:instituteId/:tournamentId", verifyToken, function(req, res) {
    console.log(req.params.instituteId + " " + req.params.tournamentId)
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('instituteId', sql.Int, req.params.instituteId)
            .input('tournementId', sql.Int, req.params.tournamentId)
            .execute('removeinstitute')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
});

router.post('/addweaknessesplayer', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, userId)
            .input('playerWeaknesses', sql.VarChar(120), req.body.playerWeaknesses)
            .execute('AddPlayerWeakness')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.delete("/deleteplayerweakness/:weaknessesId", verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('weaknessesId', sql.Int, req.params.weaknessesId)
            .execute('deleteplayerweakness')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
});

router.delete("/deleteplayer/:userId", verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, req.params.userId)
            .execute('deleteplayer')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
});

router.get('/getplayerachiev', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Achievements where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerstrengths', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Strengths where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerweaknesses', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Weaknesses where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/institutes', function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .query('select * from institute', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerfixtures', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Player_Fixture pf,Fixture f,Tournament t where pf.fixtureId=f.fixtureId AND PlayerId=@userId AND fixtureState is null AND t.tournementId=f.tournementId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerfixturesongoing', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Player_Fixture pf,Fixture f,Tournament t where pf.fixtureId=f.fixtureId AND PlayerId=@userId AND fixtureState=1 AND t.tournementId=f.tournementId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerfixturesfinished', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Player_Fixture pf,Fixture f,Tournament t where pf.fixtureId=f.fixtureId AND PlayerId=@userId AND fixtureState=0 AND t.tournementId=f.tournementId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerparents', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Player_Parent pp,Parent p where pp.parentId=p.userId AND pp.playerId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayercode', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Player_Code where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeavailability', verifyToken, function(req, res) {
    var userId = req.query.userId
    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .input('playerID', sql.Int, userId)
            .input('tournamentTeamId', sql.Int, tournamentTeamId)
            .input('AvaialReason', sql.VarChar(200), req.body.availabilityreson)
            .execute('changeavailability')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.delete("/deletecoach/:userId", verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.Int, req.params.userId)
            .execute('deletecoach')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
});

router.get('/getcoachprofile', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Coach where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getCoachTeams', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Team t,Sport s,Struture st where t.coachId=@userId AND t.sportId=s.sportId AND st.strutureId=t.strutureId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeprofilecoach', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.VarChar(30), userId)
            .input('coachFName', sql.VarChar(20), req.body.firstNameCoach)
            .input('coachLName', sql.VarChar(20), req.body.lastNameCoach)
            .input('coachAddress', sql.VarChar(100), req.body.addressAdmin)
            .input('coachNumber', sql.Int, req.body.teleNoCoach)
            .execute('updatecoach')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.get('/getparentprofile', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Parent where userId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeprofileparent', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userId', sql.VarChar(30), userId)
            .input('parentFName', sql.VarChar(20), req.body.firstNameParent)
            .input('parentLName', sql.VarChar(20), req.body.secondNameParent)
            .input('parentAddress', sql.VarChar(100), req.body.AddressParent)
            .input('ParentteleNum', sql.Int, req.body.teleNoParent)
            .execute('updateparent')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.get('/getparentplayers', verifyToken, function(req, res) {
    var userId = req.query.userId
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userId', sql.Int, userId)
                    .query('select * from Player_Parent pp, Player P where pp.playerId=p.userId AND parentId=@userId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/addplayerparent', verifyToken, function(req, res) {
    var userId = req.query.userId
    var usercode = req.query.usercode
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('usercode', sql.VarChar(20), usercode)
                    .query('select * from Player_Code where usercode=@usercode', function(er, recordset) {
                        if (err)
                            console.log(err);
                        else {
                            if (!recordset.recordset[0]) {
                                res.status(401).send('invalid')
                            } else {
                                sql.connect(sqlconfig).then(pool => {
                                    return pool.request()
                                        .input('userId', sql.Int, userId)
                                        .input('usercode', sql.VarChar(20), usercode)
                                        .execute('addparentplayer')
                                }).then(result => {
                                    res.status(200).send({ "message": "Data received" });
                                }).catch(err => {
                                    console.log(err);
                                })
                            }
                        }
                    });
            }
        });
    })
})

router.post('/confirmavailability', verifyToken, function(req, res) {
    var userId = req.query.userId
    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .input('playerID', sql.Int, userId)
            .input('tournamentTeamId', sql.Int, tournamentTeamId)
            .execute('confirmavailability')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})


router.post('/tempregisterr', (req, res) => {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), req.body.userEmail)
            .input('userPassword', sql.VarChar(20), req.body.password)
            .execute('tempregister')
    }).then(result => {
        let payload = { subject: req.body._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token });
    }).catch(err => {
        console.log(err);
    })
})

router.post('/tempregister', (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            sql.connect(sqlconfig).then(pool => {
                return pool.request()
                    .input('userEmail', sql.VarChar(50), req.body.userEmail)
                    .input('userPassword', sql.VarChar(500), hash)
                    .execute('tempregister')
            }).then(result => {
                let payload = { subject: req.body._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token });
            }).catch(err => {
                console.log(err);
            })
        });
    });

})

router.post('/chackemail', (req, respond) => {
    emailExistence.check(req.body.userEmail, function(err, res) {
        console.log('res: ' + res);
        if (res == false) {
            respond.status(401).send('invalid')
        } else {
            respond.status(200).send({ "message": "Data received" });
        }
    });
})

router.post('/sendmail', (req, respond) => {

    email = req.body.userEmail

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'supunmadushanka19980822@gmail.com',
            pass: 'mynameissuperman#'
        }
    });

    var mailOptions = {
        from: 'supunmadushanka19980822@gmail.com',
        to: email,
        subject: 'Click to activate acount',
        html: '<a href="https://mysport-codefreaks.herokuapp.com/confirmemail?email=' + email + '">https://mysport-codefreaks.herokuapp.com/home</a>'
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info);
        }
    });
})

router.post('/checkuser', (req, res) => {

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), req.body.userEmail)
            .output('Exist', sql.Int)
            .execute('proccheckuseremail', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.output.Exist == 0) {
                        let payload = { subject: req.body._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token });
                    } else {
                        res.status(401).send('invalid')
                    }
                }
            })
    }).then((res, err) => {
        console.dir('completed')
    }).catch(err => {
        console.log(err);
    })

})

router.post('/loginn', (req, res) => {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), req.body.userEmail)
            .input('userPassword', sql.VarChar(20), req.body.password)
            .output('Exist', sql.Int)
            .execute('proccheckuser', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.output.Exist == 1) {
                        let payload = { subject: req.body._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token });
                    } else {
                        res.status(401).send('invalid')
                    }
                }
            })
    }).then((res, err) => {}).catch(err => {
        console.log(err);
    })

})

router.post('/logins', (req, res) => {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userEmail', sql.VarChar(50), req.body.userEmail)
                    .input('userPassword', sql.VarChar(20), req.body.password)
                    .query('Select * From Appuser Where userEmail=@userEmail AND userPassword=@userPassword', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            console.log(recordset)
                            if (!recordset.recordset[0]) {
                                res.status(401).send('invalid')
                            } else {
                                let payload = { subject: req.body._id }
                                let token = jwt.sign(payload, 'secretKey')

                                res.status(200).send({
                                    userId: recordset.recordset[0].userId,
                                    userEmail: recordset.recordset[0].userEmail,
                                    RoleId: recordset.recordset[0].RoleId,
                                    token: token
                                });
                            }
                        }
                    });
            }
        });
    })
})

router.post('/login', (req, res) => {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userEmail', sql.VarChar(50), req.body.userEmail)
                    .input('userPassword', sql.VarChar(200), req.body.password)
                    .query('Select * From Appuser Where userEmail=@userEmail', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            console.log(recordset)
                            if (!recordset.recordset[0]) {
                                res.status(401).send('invalid')
                            } else {
                                bcrypt.compare(req.body.password, recordset.recordset[0].userPassword, function(err, result) {
                                    console.log(result)
                                    if (result == true) {
                                        let payload = { subject: req.body._id }
                                        let token = jwt.sign(payload, 'secretKey')

                                        res.status(200).send({
                                            userId: recordset.recordset[0].userId,
                                            userEmail: recordset.recordset[0].userEmail,
                                            RoleId: recordset.recordset[0].RoleId,
                                            token: token
                                        });
                                    } else {
                                        res.status(401).send('invalid')
                                    }
                                });

                            }
                        }
                    });
            }
        });
    })
})

router.get('/getuserinfo', function(req, res) {
    var userId = req.query.userId
    var RoleId = req.query.RoleId
    if (RoleId == 'ur0001') {
        sql.connect(sqlconfig).then(pool => {
            let connection = sql.connect(sqlconfig, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var request = new sql.Request();
                    request
                        .input('userId', sql.Int, userId)
                        .query('select * from Instituteadmin where userId=@userId', function(er, recordset) {
                            if (err)
                                console.log(er);
                            else {
                                res.send(recordset.recordset);
                            }
                        });
                }
            });
        })
    } else if (RoleId == 'ur0002') {
        sql.connect(sqlconfig).then(pool => {
            let connection = sql.connect(sqlconfig, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var request = new sql.Request();
                    request
                        .input('userId', sql.Int, userId)
                        .query('select * from Player where userId=@userId', function(er, recordset) {
                            if (err)
                                console.log(er);
                            else {
                                res.send(recordset.recordset);
                            }
                        });
                }
            });
        })
    } else if (RoleId == 'ur0004') {
        sql.connect(sqlconfig).then(pool => {
            let connection = sql.connect(sqlconfig, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var request = new sql.Request();
                    request
                        .input('userId', sql.Int, userId)
                        .query('select * from Coach where userId=@userId', function(er, recordset) {
                            if (err)
                                console.log(er);
                            else {
                                res.send(recordset.recordset);
                            }
                        });
                }
            });
        })
    }

})

router.post('/register', function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(30), req.body.userEmail)
            .input('RoleId', sql.VarChar(10), req.body.userType)
            .execute('register')
    }).then(result => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('userEmail', sql.VarChar(30), req.body.userEmail)
                    .query('Select * From Appuser Where userEmail=@userEmail', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            console.log(recordset.recordset)
                            let payload = { subject: req.body._id }
                            let token = jwt.sign(payload, 'secretKey')

                            res.status(200).send({
                                userId: recordset.recordset[0].userId,
                                userEmail: recordset.recordset[0].userEmail,
                                RoleId: recordset.recordset[0].RoleId,
                                token: token
                            });
                        }
                    });
            }
        });
    }).catch(err => {
        console.log(err);
    })
})

router.post('/playerregister', function(req, res) {
    var email = req.query.email
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(30), email)
            .input('playerFName', sql.VarChar(30), req.body.firstNamePlayer)
            .input('playerLName', sql.VarChar(30), req.body.secondNamePlayer)
            .input('playerAddress', sql.VarChar(30), req.body.perAddressPlayer)
            .input('playerteleNum', sql.Int, req.body.teleNoPlayer)
            .input('playerDOB', sql.VarChar(30), req.body.dobpPlayer)
            .input('playerGender', sql.VarChar(10), req.body.MFplayer)
            .input('instituteId', sql.Int, req.body.PlayerInstitute)
            .input('strutureId', sql.VarChar(10), req.body.PlayerStructure)
            .execute('playerregister')
    }).then(result => {}).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/adminregister', function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('adminFName', sql.VarChar(20), req.body.firstNameAdmin)
            .input('adminLName', sql.VarChar(20), req.body.lastNameAdmin)
            .input('adminAddress', sql.VarChar(100), req.body.addressAdmin)
            .input('adminTeliNo', sql.Int, req.body.teleNoAdmin)
            .input('adminGender', sql.VarChar(6), req.body.genderAdmin)
            .input('instituteName', sql.VarChar(50), req.body.InstituteName)
            .input('instituteLocation', sql.VarChar(50), req.body.InstituteAddress)
            .execute('adiminregister')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/parentregister', function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('ParentFName', sql.VarChar(20), req.body.firstNameParent)
            .input('ParentLName', sql.VarChar(20), req.body.secondNameParent)
            .input('typeId', sql.VarChar(10), req.body.parentSelect)
            .input('ParentteleNum', sql.Int, req.body.teleNoParent)
            .input('ParentAddress', sql.VarChar(100), req.body.AddressParent)
            .execute('Parentregister')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/teamregister', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('teamName', sql.VarChar(20), req.body.TeamName)
            .input('strutureId', sql.VarChar(10), req.body.TeamStructure)
            .input('sportId', sql.VarChar(10), req.body.Sport)
            .input('coachId', sql.Int, req.body.Coach)
            .execute('teamregister')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/coachregisterr', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('coachFName', sql.VarChar(20), req.body.firstNameCoach)
            .input('coachLName', sql.VarChar(20), req.body.lastNameCoach)
            .input('coachAddress', sql.VarChar(100), req.body.addressAdmin)
            .input('coachNumber', sql.Int, req.body.teleNoCoach)
            .input('coachGender', sql.VarChar(6), req.body.genderCoach)
            .input('coachDOB', sql.Date, req.body.dobCoach)
            .input('coachEmail', sql.VarChar(50), req.body.emailAddress)
            .input('userPassword', sql.VarChar(20), req.body.password)
            .input('sportId', sql.VarChar(10), req.body.Sport)
            .execute('coachregister')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/coachregister', verifyToken, function(req, res) {
    var Email = req.get('Email')

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'supunmadushanka19980822@gmail.com',
            pass: 'mynameissuperman#'
        }
    });

    var mailOptions = {
        from: 'supunmadushanka19980822@gmail.com',
        to: req.body.emailAddress,
        subject: 'Click to activate acount',
        text: 'this is your password to my sport account = ' + req.body.password
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info);
        }
    });

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            sql.connect(sqlconfig).then(pool => {
                return pool.request()
                    .input('userEmail', sql.VarChar(50), Email)
                    .input('coachFName', sql.VarChar(20), req.body.firstNameCoach)
                    .input('coachLName', sql.VarChar(20), req.body.lastNameCoach)
                    .input('coachAddress', sql.VarChar(100), req.body.addressAdmin)
                    .input('coachNumber', sql.Int, req.body.teleNoCoach)
                    .input('coachGender', sql.VarChar(6), req.body.genderCoach)
                    .input('coachDOB', sql.Date, req.body.dobCoach)
                    .input('coachEmail', sql.VarChar(50), req.body.emailAddress)
                    .input('userPassword', sql.VarChar(500), hash)
                    .input('sportId', sql.VarChar(10), req.body.Sport)
                    .execute('coachregister')
            }).then(result => {}).catch(err => {
                console.log(err);
            })
        });
    });
    res.status(200).send({ "message": "Data received" });
})

router.post('/createplayerr', verifyToken, function(req, res) {
    var Email = req.get('Email')
    sql.connect(sqlconfig).then(pool => {
        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('playerFName', sql.VarChar(20), req.body.firstNamePlayer)
            .input('playerLName', sql.VarChar(20), req.body.secondNamePlayer)
            .input('playerAddress', sql.VarChar(100), req.body.perAddressPlayer)
            .input('playerteleNum', sql.Int, req.body.teleNoPlayer)
            .input('playerGender', sql.VarChar(6), req.body.MFplayer)
            .input('playerDOB', sql.Date, req.body.dobpPlayer)
            .input('playerEmail', sql.VarChar(50), req.body.emailAddress)
            .input('userPassword', sql.VarChar(500), req.body.password)
            .input('strutureId', sql.VarChar(10), req.body.PlayerStructure)
            .execute('createplayer')
    }).then(result => {}).catch(err => {
        console.log(err);
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/createplayer', verifyToken, function(req, res) {
    var Email = req.get('Email')

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'supunmadushanka19980822@gmail.com',
            pass: 'mynameissuperman#'
        }
    });

    var mailOptions = {
        from: 'supunmadushanka19980822@gmail.com',
        to: req.body.emailAddress,
        subject: 'Click to activate acount',
        text: 'this is your password to my sport account = ' + req.body.password
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info);
        }
    });

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            sql.connect(sqlconfig).then(pool => {
                return pool.request()
                    .input('userEmail', sql.VarChar(50), Email)
                    .input('playerFName', sql.VarChar(20), req.body.firstNamePlayer)
                    .input('playerLName', sql.VarChar(20), req.body.secondNamePlayer)
                    .input('playerAddress', sql.VarChar(100), req.body.perAddressPlayer)
                    .input('playerteleNum', sql.Int, req.body.teleNoPlayer)
                    .input('playerGender', sql.VarChar(6), req.body.MFplayer)
                    .input('playerDOB', sql.Date, req.body.dobpPlayer)
                    .input('playerEmail', sql.VarChar(50), req.body.emailAddress)
                    .input('userPassword', sql.VarChar(500), hash)
                    .input('strutureId', sql.VarChar(10), req.body.PlayerStructure)
                    .execute('createplayer')
            }).then(result => {}).catch(err => {
                console.log(err);
            })
        });
    });
    res.status(200).send({ "message": "Data received" });
})

router.get('/getmessages', verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        sql.connect(sqlconfig).then(pool => {
            let connection = sql.connect(sqlconfig, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var request = new sql.Request();
                    request
                        .query('select * from Groupmessage', function(er, recordset) {
                            if (err)
                                console.log(er);
                            else {
                                res.send(recordset.recordset);
                            }
                        });
                }
            });
        })
    })

})

router.post('/sendMessage', verifyToken, function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('messageContent', sql.VarChar(300), req.body.myMessage)
                    .input('userName', sql.VarChar(30), req.body.user)
                    .query('insert into Groupmessage values(@messageContent,@userName)', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {}
                    });
            }
        });
    })
    res.status(200).send({ "message": "Data received" });
})

router.post('/sendreview', function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'supunmadushanka19980822@gmail.com',
            pass: 'mynameissuperman#'
        }
    });

    var mailOptions = {
        from: 'supunmadushanka19980822@gmail.com',
        to: 'supunmadushanka19980822@gmail.com',
        subject: req.body.email + ' - ' + req.body.FullName,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info);
        }
    });
})

router.get('/totalinstitutes', function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .query('select count(instituteId) as institutecount from institute', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/totalplayers', function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .query('select count(userId) as playercount from Player', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/totalteams', function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .query('select count(teamId) as teamcount from Team', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/totalcoaches', function(req, res) {
    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .query('select count(userId) as coachcount from Coach', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                        }
                    });
            }
        });
    })
})

module.exports = router