// ECS Cluster configuration

resource "aws_ecs_cluster" "watchit" {
  name = "watchit-cluster"
}

module "cluster_instances" {
  source                = "./tf-aws-ecs-container-instance"
  name                  = "forum"
  ecs_cluster_name      = aws_ecs_cluster.watchit.name
  lc_instance_type      = "t2.nano"
  lc_security_group_ids = [aws_security_group.main_security_group.id]
  asg_subnet_ids        = [aws_subnet.private_1a.id]
}