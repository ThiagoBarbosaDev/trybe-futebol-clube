module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeam: {
        field: 'home_team',
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeam: {
        field: 'away_team',
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: true,
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {
        field: 'in_progress',
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};