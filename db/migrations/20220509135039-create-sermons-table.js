'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('sermons_tables', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            sermons_title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sermon_pastor: {
                type: Sequelize.STRING,
                allowNull: false
            },
            theme: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sermon_body: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sermon_audio: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sermon_pdf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sermon_s_link: {
                type: Sequelize.STRING,
                allowNull: false
            },
            pic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('sermons_tables');
    }
};