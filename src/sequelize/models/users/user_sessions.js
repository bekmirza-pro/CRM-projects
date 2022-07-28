module.exports = (sequelize, DataTypes) => {
    const user_sessions = sequelize.define('user_sessions', {
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        token_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_logged_out: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        logged_in_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now'),
        },
        logged_out_at: {
            type: DataTypes.DATE,
        },
        remote_ip: {
            type: DataTypes.INET,
            allowNull: true,
        },
        device: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });
    return user_sessions
}
