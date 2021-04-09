const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const emailExistence = require('email-existence');
var nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');
const saltRounds = 5;

/////////////////////////////////////////////////////////////

const app = express();
const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('user connected');
});

io.on('message', (msg) => {
    console.log('emit works')
    io.emit(msg);
});

///////////////////////////////////////////////////////////////

const sql = require('mssql');
const e = require('express');
const sqlconfig = {
    user: 'sa',
    password: '123',
    server: 'DESKTOP-1CHJNQH',
    database: 'sms',
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

//Ctrl+K+C
//Ctrl+K+U



//Admin
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/teams', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from getteamview1 where instituteId=@institute', function(er, recordset) {
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

router.get('/coaches', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from getcoachview1 where instituteId=@institute', function(er, recordset) {
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

router.get('/players', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from playerview where instituteId=@institute', function(er, recordset) {
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

router.get('/sports', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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

router.get('/teamplayers', function(req, res) {

    var Email = req.get('Email')
    var teamId = req.query.teamId
    console.log(teamId);

    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('teamId', sql.Int, teamId)
                    .query('select * from Player p, Team_Player tp where p.userId = tp.playerId and tp.teamId=@teamId', function(er, recordset) {
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

router.get('/teamdetails', function(req, res) {

    var Email = req.get('Email')
    var teamId = req.query.teamId
    console.log(teamId);

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/teamachieve', function(req, res) {

    var Email = req.get('Email')
    var teamId = req.query.teamId
    console.log(teamId);

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})


router.post('/addachieve', function(req, res) {

    console.log(req.body);
    var Email = req.get('Email')
    console.log(Email);

    var teamId = req.query.teamId

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('teamId', sql.Int, teamId)
            .input('teamAchievements', sql.VarChar(120), req.body.achievecontent)
            .execute('Addachieve')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.get('/addplayerview', function(req, res) {

    var Email = req.get('Email')
    var teamId = req.query.teamId
    var structureId

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('teamId', sql.Int, teamId)
            .output('strutureId', sql.VarChar(10))
            .output('instituteId', sql.Int)
            .execute('getStructureId', (err, result) => {
                if (err) {
                    console.log(result);
                } else {
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
                                    .query('select * from addplayerview where strutureId=@structureId AND (teamId!=@teamId or teamId IS Null) AND instituteId=@instituteId', function(er, recordset) {
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


router.post('/addplayer', function(req, res) {

    var Email = req.get('Email')

    var teamId = req.query.teamId
    var playerId = req.query.playerId

    console.log(Email);
    console.log("team Id is: " + teamId);
    console.log(playerId);
    console.log("hi");

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('teamId', sql.Int, teamId)
            .input('playerId', sql.Int, playerId)
            .execute('addplayerteam')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/removeplayer', function(req, res) {

    var Email = req.get('Email')

    var teamId = req.query.teamId
    var playerId = req.query.playerId

    console.log(Email);
    console.log("team Id is: " + teamId);
    console.log(playerId);
    console.log("hi");

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('teamId', sql.Int, teamId)
            .input('playerId', sql.Int, playerId)
            .execute('removeplayerteam')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})


router.post('/createtournament', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('tournamentName', sql.VarChar(30), req.body.TournamentName)
            .input('sportId', sql.VarChar(10), req.body.Sport)
            .input('under15male', sql.VarChar(5), req.body.under15male)
            .input('under15female', sql.VarChar(5), req.body.under15female)
            .input('under17male', sql.VarChar(5), req.body.under17male)
            .input('under17female', sql.VarChar(5), req.body.under17female)
            .input('under19male', sql.VarChar(5), req.body.under19male)
            .input('under19female', sql.VarChar(5), req.body.under19female)
            .execute('createtournament')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.get('/getcreatedtournament', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Tournament_Institute ti, Tournament t, Sport s where t.tournementId=ti.tournementId AND t.sportId=s.sportId AND ti.instituteId=@institute AND tournamentstatus is null', function(er, recordset) {
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

router.get('/getstartedtournament', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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

router.get('/getfinishedtournament', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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

router.get('/getselectedtournament', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    var tournamentId = req.query.tournamentId
    console.log(tournamentId);

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

router.get('/getnewtournament', function(req, res) {

    var Email = req.get('Email')
    console.log('my email is ' + Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select * from Tournament t,Sport s where not exists( select * from Tournament_Institute ti where instituteId=@institute AND ti.tournementId=t.tournementId) AND t.sportId=s.sportId', function(er, recordset) {
                                    if (err)
                                        console.log(er);
                                    else {
                                        console.log(recordset.recordset);
                                        res.send(recordset.recordset);
                                    }
                                });
                        }
                    });
                }
            })
    }).then((result) => {}).catch(err => {})
})

router.post('/jointournament', (req, res) => {

    var Email = req.get('Email')
    var tournementId = req.query.tournementId

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('tournementId', sql.Int, tournementId)
            .execute('jointour')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.get('/getfixturefirstteam', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

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
                                console.log(recordset.recordset)
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
                                console.log(recordset.recordset)
                            }
                        });
                }
            });
        })

    }

})

router.get('/getupcomingfixture', function(req, res) {

    var tournementId = req.query.tournementId
    console.log(tournementId);

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getongoingfixture', function(req, res) {

    var tournementId = req.query.tournementId
    console.log(tournementId);

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getfinishedfixture', function(req, res) {

    var tournementId = req.query.tournementId
    console.log(tournementId);

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/upcomingfixturedetails', function(req, res) {

    var fixtureId = req.query.fixtureId
    console.log(fixtureId);

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getfixtureteamplayers', function(req, res) {

    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId

    console.log(fixtureId);

    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('fixtureId', sql.Int, fixtureId)
                    .input('tournamentTeamId', sql.Int, tournamentTeamId)
                    .query('select * from Player_Fixture pf,Tournament_Team tt,Player p where pf.tournamentTeamId=tt.tournamentTeamId AND p.userId=pf.playerId AND tt.tournamentTeamId=@tournamentTeamId AND pf.fixtureId=@fixtureId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})


router.get('/getaddfixtureplayers', function(req, res) {

    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId
    console.log(Email);

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
                    console.log(result);
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

router.get('/getremovefixtureplayers', function(req, res) {

    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId
    console.log(Email);

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
                    console.log(result);
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

router.get('/getTotal', function(req, res) {

    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId

    console.log("sum fixtureId = " + fixtureId)
    console.log("sum tournamentTeamId = " + tournamentTeamId)

    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('fixtureId', sql.Int, fixtureId)
                    .input('tournamentTeamId', sql.Int, tournamentTeamId)
                    .query('select sum(playerScore) as sumScore from Player_Fixture where fixtureId=@fixtureId AND tournamentTeamId=@tournamentTeamId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getsummery', function(req, res) {

    var tournamentId = req.query.tournamentId

    sql.connect(sqlconfig).then(pool => {
        let connection = sql.connect(sqlconfig, (err) => {
            if (err) {
                console.log(err);
            } else {
                var request = new sql.Request();
                request
                    .input('tournamentId', sql.Int, tournamentId)
                    .query('select * from tournamentsummery where tournementId=@tournamentId', function(er, recordset) {
                        if (err)
                            console.log(er);
                        else {
                            res.send(recordset.recordset);
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getinstituteteamcount', function(req, res) {

    var Email = req.get('Email')

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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

router.get('/getinstitutecoachcount', function(req, res) {

    var Email = req.get('Email')

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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

router.get('/getinstituteplayercount', function(req, res) {

    var Email = req.get('Email')

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    let connection = sql.connect(sqlconfig, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var request = new sql.Request();
                            request
                                .input('institute', sql.Int, result.output.Exist)
                                .query('select count(playerId) as noOfPlayers from Team_Player tp,Team t where tp.teamId=t.teamId AND instituteId=@institute', function(er, recordset) {
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

router.get('/getinstituteprofile', function(req, res) {

    var Email = req.get('Email')

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .execute('getinstituteid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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

router.post('/addfixtureplayer', (req, res) => {

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
                                .query('insert into Player_Fixture values(@fixtureId,@userId,null,null,@tournamentTeamId,1,null,null)', function(er, recordset) {
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

router.post('/removefixtureplayer', (req, res) => {

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

router.post('/startfixture', (req, res) => {

    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .execute('startfixture')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/postponefixture', (req, res) => {

    var fixtureId = req.query.fixtureId
    console.log('my fixture is :' + fixtureId)

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .execute('postponefixture')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/finishfixture', (req, res) => {

    var Email = req.get('Email')
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
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/starttournament', function(req, res) {

    var Email = req.get('Email')

    var tourId = req.body[0]
    console.log("body is =" + req.body[0]);


    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('tournementId', sql.Int, tourId)
            .execute('starttournement')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/postponetournament', function(req, res) {

    var Email = req.get('Email')

    var tourId = req.body[0]
    console.log("body is =" + req.body[0]);


    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('tournementId', sql.Int, tourId)
            .execute('postponetournament')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/finishtournament', function(req, res) {

    var Email = req.get('Email')

    var tourId = req.body[0]
    console.log("body is =" + req.body[0]);


    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('tournementId', sql.Int, tourId)
            .execute('finishtournament')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/addplayerscore', function(req, res) {

    var Email = req.get('Email')
    var fixtureId = req.query.fixtureId
    var playerId = req.query.currentUserId
    var tournamentTeamId = req.query.tournamentTeamId
    var score = req.query.score

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .input('playerID', sql.Int, playerId)
            .input('playerScore', sql.Int, score)
            .input('tournamentTeamId', sql.Int, tournamentTeamId)
            .execute('addplayerscore')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/registerfixture', function(req, res) {

    var Email = req.get('Email')

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
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

//Player
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getplayerId', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/playerteams', function(req, res) {

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .output('Exist', sql.Int)
            .output('ui', sql.Int)
            .execute('getplayerid', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
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

router.get('/getplayerteams', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerprofile', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeprofileplayer', function(req, res) {

    var userId = req.query.userId
    console.log(req.body);

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
            .execute('updateplayer')
    }).then(result => {
        console.dir(result)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/changePassword', function(req, res) {

    var userId = req.query.userId
    console.log(req.body);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userId', sql.Int, userId)
            .input('userPassword', sql.VarChar(20), req.body.password)
            .execute('changePassword')
    }).then(result => {
        console.dir(result)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/addachievplayer', function(req, res) {

    var userId = req.query.userId

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userId', sql.Int, userId)
            .input('playerAchievements', sql.VarChar(120), req.body.achievecontent)
            .execute('AddPlayerAchieve')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.get('/getplayerachiev', function(req, res) {

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
                            console.log(recordset.recordset);
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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getplayerfixtures', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeavailability', function(req, res) {

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
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})


//coach
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/getcoachprofile', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.get('/getCoachTeams', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeprofilecoach', function(req, res) {

    var userId = req.query.userId
    console.log(req.body);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userId', sql.VarChar(30), userId)
            .input('coachFName', sql.VarChar(20), req.body.firstNameCoach)
            .input('coachLName', sql.VarChar(20), req.body.lastNameCoach)
            .input('coachAddress', sql.VarChar(100), req.body.addressAdmin)
            .input('coachNumber', sql.Int, req.body.teleNoCoach)
            .execute('updatecoach')
    }).then(result => {
        console.dir(result)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

//parent
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/getparentprofile', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/changeprofileparent', function(req, res) {

    var userId = req.query.userId
    console.log(req.body);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userId', sql.VarChar(30), userId)
            .input('parentFName', sql.VarChar(20), req.body.firstNameParent)
            .input('parentLName', sql.VarChar(20), req.body.secondNameParent)
            .input('parentAddress', sql.VarChar(100), req.body.AddressParent)
            .input('ParentteleNum', sql.Int, req.body.teleNoParent)
            .execute('updateparent')
    }).then(result => {
        console.dir(result)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.get('/getparentplayers', function(req, res) {

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
                            console.log(recordset.recordset);
                        }
                    });
            }
        });
    })
})

router.post('/confirmavailability', function(req, res) {

    var userId = req.query.userId
    var fixtureId = req.query.fixtureId
    var tournamentTeamId = req.query.tournamentTeamId

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('fixtureId', sql.Int, fixtureId)
            .input('playerID', sql.Int, userId)
            .input('tournamentTeamId', sql.Int, tournamentTeamId)
            .execute('confirmavailability')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/tempregister', (req, res) => {

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), req.body.userEmail)
            .input('userPassword', sql.VarChar(20), req.body.password)
            .execute('tempregister')
    }).then(result => {
        let payload = { subject: req.body._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token });
        console.dir(result)
    }).catch(err => {
        console.log(err);
    })


})

router.post('/tempregisterr', (req, res) => {

    bcrypt.genSalt(10, function(err, salt) {

        bcrypt.hash(req.body.password, salt, function(err, hash) {
            console.log(hash)
            sql.connect(sqlconfig).then(pool => {

                return pool.request()
                    .input('userEmail', sql.VarChar(50), req.body.userEmail)
                    .input('userPassword', sql.VarChar(500), hash)
                    .execute('tempregister')
            }).then(result => {
                let payload = { subject: req.body._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token });
                console.dir(result)
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
        html: '<a href="http://localhost:4200/confirmemail?email=' + email + '">localhost:4200/home</a>'
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
                        console.dir(result)
                    } else {
                        res.status(401).send('invalid')
                    }
                    //res.status(200).send(result);
                }
            })
    }).then((res, err) => {
        console.dir('completed')
    }).catch(err => {
        console.log(err);
    })

})

router.post('/loginn', (req, res) => {
    console.log(req.body);

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
                    //res.status(200).send(result);
                }
            })
    }).then((res, err) => {
        console.dir(result)
    }).catch(err => {
        console.log(err);
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

router.post('/logins', (req, res) => {
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


router.get('/user', function(req, res) {

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
    console.log(req.body);
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
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/adminregister', function(req, res) {
    console.log(req.body);

    var Email = req.get('Email')
    console.log(Email);

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
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/parentregister', function(req, res) {
    console.log(req.body);

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('ParentFName', sql.VarChar(20), req.body.firstNameParent)
            .input('ParentLName', sql.VarChar(20), req.body.secondNameParent)
            .input('typeId', sql.VarChar(10), req.body.parentSelect)
            .input('ParentteleNum', sql.Int, req.body.teleNoParent)
            .input('ParentAddress', sql.VarChar(100), req.body.AddressParent)
            .execute('Parentregister')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/teamregister', function(req, res) {
    console.log(req.body);

    var Email = req.get('Email')
    console.log(Email);

    sql.connect(sqlconfig).then(pool => {

        return pool.request()
            .input('userEmail', sql.VarChar(50), Email)
            .input('teamName', sql.VarChar(20), req.body.TeamName)
            .input('strutureId', sql.VarChar(10), req.body.TeamStructure)
            .input('sportId', sql.VarChar(10), req.body.Sport)
            .input('coachId', sql.Int, req.body.Coach)
            .execute('teamregister')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/coachregister', function(req, res) {
    console.log(req.body);

    var Email = req.get('Email')
    console.log(Email);

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
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.post('/createplayer', function(req, res) {
    console.log(req.body);

    var Email = req.get('Email')
    console.log(Email);

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
            .input('userPassword', sql.VarChar(20), req.body.password)
            .input('strutureId', sql.VarChar(10), req.body.PlayerStructure)
            .execute('createplayer')
    }).then(result => {
        console.dir(req.body)
    }).catch(err => {
        console.log(err);
    })

    res.status(200).send({ "message": "Data received" });
})

router.get('/getmessages', function(req, res) {
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
                                console.log(recordset.recordset);
                            }
                        });
                }
            });
        })
    })

})

router.post('/sendMessage', function(req, res) {

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

module.exports = router