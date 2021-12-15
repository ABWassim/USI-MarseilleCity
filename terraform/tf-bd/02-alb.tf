// Declare load balancer resources

resource "aws_alb" "external-endpoint" {
  name               = "forum-load-balancer"
  internal           = false
  load_balancer_type = "application"

  security_groups = [aws_security_group.main_security_group.id]

  subnets = [aws_subnet.public_1a.id, aws_subnet.public_1b.id]

}


resource "aws_alb_target_group" "users-target-group" {
  vpc_id = aws_vpc.main.id

  name     = "users-target-group"
  port     = 3000
  protocol = "HTTP"
}

resource "aws_alb_target_group" "videos-target-group" {
  vpc_id = aws_vpc.main.id

  name     = "videos-target-group"
  port     = 3001
  protocol = "HTTP"
}

resource "aws_alb_target_group" "playlists-target-group" {
  vpc_id = aws_vpc.main.id

  name     = "playlists-target-group"
  port     = 3002
  protocol = "HTTP"
}

resource "aws_alb_target_group" "adverts-target-group" {
  vpc_id = aws_vpc.main.id

  name     = "adverts-target-group"
  port     = 3003
  protocol = "HTTP"
}


resource "aws_alb_target_group" "frontend-target-group" {
  vpc_id = aws_vpc.main.id

  name     = "frontend-target-group"
  port     = 80
  protocol = "HTTP"
}


resource "aws_lb_listener" "users-lb-listener" {
  load_balancer_arn = aws_alb.external-endpoint.arn

  port     = "3000"
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.users-target-group.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "videos-lb-listener" {
  load_balancer_arn = aws_alb.external-endpoint.arn

  port     = "3001"
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.videos-target-group.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "playlists-lb-listener" {
  load_balancer_arn = aws_alb.external-endpoint.arn

  port     = "3002"
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.playlists-target-group.arn
    type             = "forward"
  }
}

resource "aws_lb_listener" "adverts-lb-listener" {
  load_balancer_arn = aws_alb.external-endpoint.arn

  port     = "3003"
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.adverts-target-group.arn
    type             = "forward"
  }
}


resource "aws_lb_listener" "frontend-lb-listener" {
  load_balancer_arn = aws_alb.external-endpoint.arn

  port     = "80"
  protocol = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.frontend-target-group.arn
    type             = "forward"
  }
}
