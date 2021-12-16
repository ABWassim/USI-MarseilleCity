resource "aws_ecs_task_definition" "app-users-task-definition" {
  family = "app-users-service"
  container_definitions = jsonencode([
    {
      name = "backend-users"
      image = "066130658641.dkr.ecr.us-east-1.amazonaws.com/watchit:backend-users"
      cpu = 10
      memory = 128
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "app-videos-task-definition" {
  family = "app-videos-service"
  container_definitions = jsonencode([
    {
      name = "backend-videos"
      image = "066130658641.dkr.ecr.us-east-1.amazonaws.com/watchit:backend-videos"
      cpu = 10
      memory = 128
      essential = true
      portMappings = [
        {
          containerPort = 3001
          hostPort      = 3001
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "app-playlists-task-definition" {
  family = "app-playlists-service"
  container_definitions = jsonencode([
    {
      name = "backend-playlists"
      image = "066130658641.dkr.ecr.us-east-1.amazonaws.com/watchit:backend-playlists"
      cpu = 10
      memory = 128
      essential = true
      portMappings = [
        {
          containerPort = 3002
          hostPort      = 3002
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "app-adverts-task-definition" {
  family = "app-adverts-service"
  container_definitions = jsonencode([
    {
      name = "backend-adverts"
      image = "066130658641.dkr.ecr.us-east-1.amazonaws.com/watchit:backend-adverts"
      cpu  = 10
      memory = 128
      essential = true
      portMappings = [
        {
          containerPort = 3003
          hostPort      = 3003
        }
      ]
    }
  ])
}

resource "aws_ecs_task_definition" "app-frontend-task-definition" {
  family = "app-frontend-service"
  container_definitions = jsonencode([
    {
      name = "frontend"
      image = "066130658641.dkr.ecr.us-east-1.amazonaws.com/watchit:frontend"
      cpu  = 10
      memory = 128
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "app-users" {
  name            = "app-users"
  cluster         = aws_ecs_cluster.watchit.id
  task_definition = aws_ecs_task_definition.app-users-task-definition.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_alb_target_group.users-target-group.arn
    container_name   = "backend-users"
    container_port   = 3000
  }
}

resource "aws_ecs_service" "app-videos" {
  name            = "app-videos"
  cluster         = aws_ecs_cluster.watchit.id
  task_definition = aws_ecs_task_definition.app-videos-task-definition.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_alb_target_group.videos-target-group.arn
    container_name   = "backend-videos"
    container_port   = 3001
  }
}

resource "aws_ecs_service" "app-playlists" {
  name            = "app-playlists"
  cluster         = aws_ecs_cluster.watchit.id
  task_definition = aws_ecs_task_definition.app-playlists-task-definition.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_alb_target_group.playlists-target-group.arn
    container_name   = "backend-playlists"
    container_port   = 3002
  }
}

resource "aws_ecs_service" "app-adverts" {
  name            = "app-adverts"
  cluster         = aws_ecs_cluster.watchit.id
  task_definition = aws_ecs_task_definition.app-adverts-task-definition.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_alb_target_group.adverts-target-group.arn
    container_name   = "backend-adverts"
    container_port   = 3003
  }
}


resource "aws_ecs_service" "app-frontend" {
  name            = "app-frontend"
  cluster         = aws_ecs_cluster.watchit.id
  task_definition = aws_ecs_task_definition.app-frontend-task-definition.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_alb_target_group.frontend-target-group.arn
    container_name   = "frontend"
    container_port   = 80
  }
}

