const express = require('express');

const adminController = {
    home: (req,res)=>{
        res.render('admin/indexAdm.ejs')
    },
    config: (req,res)=>{
        res.render('admin/configAdm.ejs')
    }
}

module.exports = adminController;